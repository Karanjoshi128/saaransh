import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}


export default nextConfig;