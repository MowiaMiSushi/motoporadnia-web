/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'dist',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  staticPageGenerationTimeout: 1000,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://motoporadnia-web.netlify.app',
  },
}

module.exports = nextConfig 