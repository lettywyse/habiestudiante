/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.badi.com' },
      { protocol: 'https', hostname: '**.uniplaces.com' },
    ],
  },
}

module.exports = nextConfig
