/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hatscripts.github.io',
        pathname: '**',
      },
    ],
  }
}

module.exports = nextConfig
