/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "config", "logger"],
  images: {
    remotePatterns: process.env.NEXT_IMAGE_DOMAINS.split(",").map((domain) => ({
      hostname: domain,
    }))
  }
};
