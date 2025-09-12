import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ecommerce.routemisr.com/**/**'),
      new URL('https://corsproxy.io/**/**'),
    ],
    unoptimized: true, // يعطل التحسين نهائياً
  },
};

export default nextConfig;