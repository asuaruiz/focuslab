const supabaseHostname = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      ...(supabaseHostname ? [{
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/public/**",
      }] : []),
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
  async redirects() {
    return [
      { source: "/filosofia", destination: "/about", permanent: true },
      { source: "/servicios", destination: "/services", permanent: true },
      { source: "/servicios/:slug", destination: "/services", permanent: true },
      { source: "/casos-de-estudio", destination: "/work", permanent: true },
      { source: "/casos-de-estudio/:slug", destination: "/work/:slug", permanent: true },
      { source: "/experiencia-clientes", destination: "/about", permanent: true },
      { source: "/contacto", destination: "/contact", permanent: true },
      { source: "/en/filosofia", destination: "/en/about", permanent: true },
      { source: "/en/servicios", destination: "/en/services", permanent: true },
      { source: "/en/casos-de-estudio", destination: "/en/work", permanent: true },
      { source: "/en/experiencia-clientes", destination: "/en/about", permanent: true },
      { source: "/en/contacto", destination: "/en/contact", permanent: true },
    ];
  },
};

module.exports = nextConfig;
