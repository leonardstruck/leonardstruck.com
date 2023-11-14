const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["ui", "config", "logger"],
  images: {
    remotePatterns: process.env.NEXT_IMAGE_DOMAINS.split(",").map((domain) => ({
      hostname: domain,
    }))
  }
};

module.exports = config;