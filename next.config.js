/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false, // Set to true if you want a 308 permanent redirect
      },
    ];
  },
};

module.exports = nextConfig;
