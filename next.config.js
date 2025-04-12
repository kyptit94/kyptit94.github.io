/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
  assetPrefix: './', // Ensures assets are loaded correctly
  trailingSlash: true, // Adds trailing slashes to URLs
};

module.exports = nextConfig;