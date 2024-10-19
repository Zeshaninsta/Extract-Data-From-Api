/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',  // Add the protocol
          hostname: 'startsoon.com',  // Correct property for the hostname
          pathname: '/**',  // This allows all paths
        },
      ],
    },
  };
  
  export default nextConfig;
  