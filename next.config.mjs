/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'api.fesp.shop',
        // pathname: '/files/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'next.fesp.shop',
      //   pathname: '/files/**',
      // },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '**',
      },
    ],

    
  },
  // reactStrictMode: false, // Strict Mode 비활성화
};

export default nextConfig;
