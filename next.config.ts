import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ecommerce.routemisr.com/**/**"),
      new URL("https://uhgyjun7vv.ufs.sh/**/**"),
      new URL("https://sea1.ingest.uploadthing.com/**/**"),
      new URL("https://uploadthing.com/**/**"),
    ],
  },
};

export default nextConfig;
