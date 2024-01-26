/** @type {import('next').NextConfig} */

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
