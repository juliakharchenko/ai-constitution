/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    // If deploying to a subdirectory (like username.github.io/repo-name)
    // basePath: '/your-repo-name',
    // assetPrefix: '/your-repo-name',
  }
  
  module.exports = nextConfig