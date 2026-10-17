/** @type {import('next').NextConfig} */

// Permit font downloads through SSL-inspecting campus/corporate proxies during development
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/gallery/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
