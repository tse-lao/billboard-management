/** @type {import('next').NextConfig} */

//https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ipfs.io',
            port: '',
            pathname: '/ipfs/**',
          },
          
        ],
      },
}

module.exports = nextConfig
