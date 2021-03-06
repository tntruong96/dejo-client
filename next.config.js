const path = require('path')
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    esmExternals: false
  },
  images: {
      domains: ["dev.dejosaigon.vn", "103.104.119.145"]
  }
}

module.exports = nextConfig
