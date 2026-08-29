import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
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
];

const nextConfig: NextConfig = {
  compress: true,
  output: "standalone",
  experimental: {
    clientTraceMetadata: ["sentry-trace", "baggage"],
  },
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
      {
        source: "/brands",
        destination: "/for-brands",
        permanent: true,
      },
      {
        source: "/wiki/blog",
        destination: "/wiki",
        statusCode: 301,
      },
      {
        source: "/wiki/blog/theme/:id",
        destination: "/wiki/theme/:id",
        statusCode: 301,
      },
      {
        source: "/wiki/blog/platform/:id",
        destination: "/wiki/platform/:id",
        statusCode: 301,
      },
      {
        source: "/wiki/blog/:slug",
        destination: "/wiki/:slug",
        statusCode: 301,
      },
      {
        source: "/questionnaire/brands",
        destination: "/contact/brands",
        permanent: true,
      },
      {
        source: "/questionnaire/talents",
        destination: "/contact/talents",
        permanent: true,
      },
      {
        source: "/questionnaire/brands/:path*",
        destination: "/contact/brands",
        permanent: true,
      },
      {
        source: "/questionnaire/talents/:path*",
        destination: "/contact/talents",
        permanent: true,
      },
      {
        source: "/questionnaire",
        destination: "/contact/talents",
        permanent: true,
      },
      {
        source: "/questionnaire/:path*",
        destination: "/contact/talents",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    tunnelRoute: "/monitoring",
    webpack: {
      autoInstrumentServerFunctions: true,
    },
  }
);
