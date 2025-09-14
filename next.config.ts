import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ecommerce.routemisr.com/**/**'),
      new URL('https://corsproxy.io/**/**'),
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
      ],
    },
  },
};

export default nextConfig;