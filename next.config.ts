import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },
  ...(isProd
    ? [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ]
    : []),
  {
    key: "Content-Security-Policy",
    value:
      [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline' ${!isProd ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https://images.unsplash.com https://assets.wafia.fr https://www.google-analytics.com",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://fonts.googleapis.com https://fonts.gstatic.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'"
      ]
        .join("; ")
        .replace(/\s+/g, " ")
        .trim(),
  },
];

const nextConfig: NextConfig = {
  compress: true,
  output: "standalone",
  typescript: {
    // ignoreBuildErrors: true, // Temporarily disabled to ensure type safety. Can be changed if needed later.
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.wafia.fr",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/talents",
        destination: "/for-talents",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/wiki", destination: "/wiki/index.html" },
        { source: "/wiki/blog", destination: "/wiki/blog/index.html" },
        { source: "/wiki/blog/theme/:id", destination: "/wiki/blog/theme/:id/index.html" },
        { source: "/wiki/blog/platform/:id", destination: "/wiki/blog/platform/:id/index.html" },
        { source: "/wiki/blog/:slug", destination: "/wiki/blog/:slug/index.html" },
      ],
      fallback: [
        { source: "/questionnaire", destination: "/questionnaire/index.html" },
        { source: "/questionnaire/:path*", destination: "/questionnaire/index.html" },
        { source: "/questionnaire-brands", destination: "/questionnaire-brands/index.html" },
        { source: "/questionnaire-brands/:path*", destination: "/questionnaire-brands/index.html" },
      ]
    };
  },
};

export default nextConfig;
