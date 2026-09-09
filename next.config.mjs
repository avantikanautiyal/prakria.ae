import legacyRedirects from './legacy-redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
    async redirects() {
        return legacyRedirects;
    },
};

export default nextConfig;
