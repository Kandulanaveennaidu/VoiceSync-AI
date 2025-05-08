
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent bundling of Node.js specific modules for the client
      // by providing a fallback that resolves to an empty module.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false, 
      };
    }
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
