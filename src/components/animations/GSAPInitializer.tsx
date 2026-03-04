"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GSAPInitializer() {
    useEffect(() => {
        // Basic global GSAP setup or ScrollTrigger refresh can go here if needed
        ScrollTrigger.refresh();
    }, []);

    return null;
}
