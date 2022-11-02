/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

// module.exports = {
//   images: {
//     domains: [
//       "exquiz-image.s3.ap-northeast-2.amazonaws.com",
//       "encrypted-tbn0.gstatic.com",
//       "exquiz.me",
//       "www.exquiz.me",
//       "lh3.googleusercontent.com",
//     ],
//     // formats: ['image/avif', 'image/webp'],
//   },
// };

// module.exports = withPlugins(
//   [
//     [
//       withPWA,
//       {
//         pwa: {
//           dest: "public",
//         },
//       },
//     ],
//   ],
//   {
//     images: {
//       domains: [
//         "exquiz-image.s3.ap-northeast-2.amazonaws.com",
//         "encrypted-tbn0.gstatic.com",
//         "exquiz.me",
//         "www.exquiz.me",
//         "lh3.googleusercontent.com",
//       ],
//       // formats: ['image/avif', 'image/webp'],
//     },
//   },
//   nextConfig
// );

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
    {
      images: {
        domains: [
          "exquiz-image.s3.ap-northeast-2.amazonaws.com",
          "encrypted-tbn0.gstatic.com",
          "exquiz.me",
          "www.exquiz.me",
          "lh3.googleusercontent.com",
        ],
        // formats: ['image/avif', 'image/webp'],
      },
    },

    // ...
  ],
  nextConfig
);
