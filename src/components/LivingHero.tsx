"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useVideoTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const VideoPlane = ({ videoSrc }: { videoSrc: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useVideoTexture(videoSrc, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  });

  const { viewport } = useThree();

  // Custom Shader for Masking & Transitions
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uProgress: { value: 0 }, // For future transitions
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      void main() {
        // Sample the video texture
        vec4 color = texture2D(uTexture, vUv);
        
        // Simple Vignette Effect
        float dist = distance(vUv, vec2(0.5));
        color.rgb *= smoothstep(0.8, 0.4, dist);

        // Noise mask based on mouse (simulated)
        float mask = smoothstep(0.4, 0.5, 1.0 - distance(vUv, uMouse * 0.5 + 0.5));
        
        gl_FragColor = color;
      }
    `,
  }), [texture, viewport.width, viewport.height]);

  useFrame((state) => {
    if (meshRef.current) {
      const { mouse } = state;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial args={[shaderArgs]} transparent={true} />
    </mesh>
  );
};

export default function LivingHero() {
  return (
    <section className="relative w-full h-screen bg-noir overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas gl={{ antialias: false, alpha: true }}>
          <Suspense fallback={null}>
            <VideoPlane videoSrc="/LOGO LOW RESOLUTION.mp4" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pointer-events-none">
        <h1 className="font-display text-7xl md:text-9xl font-bold tracking-tighter text-white uppercase mix-blend-difference mb-4">
          Visual <br /> Storytelling
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted uppercase tracking-[0.3em] mix-blend-difference">
          Elevating Brand Voices for the Digital Age
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-rose-accent animate-scroll-indicator" />
        </div>
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      </div>

      <style jsx>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}</style>
    </section>
  );
}
