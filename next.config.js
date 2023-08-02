/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/css')],
    },
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
