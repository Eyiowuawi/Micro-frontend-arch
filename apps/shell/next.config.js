const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;

    // Get remote URLs from environment variables, fallback to localhost for development
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
    const customerUrl =
      process.env.NEXT_PUBLIC_CUSTOMER_URL || "http://localhost:3002";

    // Apply Module Federation plugin for both client and server
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          admin: `admin@${adminUrl}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          customer: `customer@${customerUrl}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
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
