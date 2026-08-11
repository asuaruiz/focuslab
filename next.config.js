/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Cover images on articles published through the Indexal webhook. If a
      // hero image ever arrives from a different host, add it here or
      // next/image will refuse to optimise it and the cover renders empty.
      {
        protocol: "https",
        hostname: "getindexal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.getindexal.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
