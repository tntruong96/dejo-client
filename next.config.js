const path = require('path')
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    URL_API: "http://dev.dejosaigon.vn/api",
    URL_ORI: "http://dev.dejosaigon.vn",
  },
  experimental: {
    esmExternals: false
  },
  images: {
      domains: ["dev.dejosaigon.vn"]
  }
}

module.exports = nextConfig
