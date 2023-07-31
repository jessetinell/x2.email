/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/cloudflare/:path*',
                destination: 'https://api.cloudflare.com/client/v4/:path*'
            }
        ]
    }
}

module.exports = nextConfig
