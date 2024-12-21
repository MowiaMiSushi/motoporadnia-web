/** @type {import('next').NextConfig} */
const nextConfig = {
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
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://motoporadnia-web.netlify.app',
  },
}

module.exports = nextConfig 