/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    images: {
        domains: ['images.unsplash.com'], // Add your allowed domains here
      },
}

module.exports = nextConfig
