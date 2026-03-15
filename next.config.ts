import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "compute-pressure=(self \"https://www.youtube.com\")",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
