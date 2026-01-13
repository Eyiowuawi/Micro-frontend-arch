const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
    ];
  },
  webpack: (config, options) => {
    const { isServer } = options;

    // Apply Module Federation plugin for both client and server
    config.plugins.push(
      new NextFederationPlugin({
        name: "admin",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./AdminDashboard": "./components/AdminDashboard",
          "./AdminLayout": "./components/AdminLayout",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
