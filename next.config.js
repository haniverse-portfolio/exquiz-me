/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["exquiz-image.s3.ap-northeast-2.amazonaws.com"],
  },
};
