/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'u-mercari-images.mercdn.net',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'media.giphy.com',
            },
            {
                protocol: 'https',
                hostname: 'i.giphy.com',
            },
        ],
    },
}

module.exports = nextConfig