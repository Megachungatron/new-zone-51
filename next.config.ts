/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'parkapp.ca',
            'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        ],
    },
    experimental: {
        runtime: 'edge',
    }
};

export default nextConfig;
