const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;

    // Only apply Module Federation on client-side to avoid SSR issues
    if (!isServer) {
      // Get remote URLs from environment variables, fallback to localhost for development
      const adminUrl =
        process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
      const customerUrl =
        process.env.NEXT_PUBLIC_CUSTOMER_URL || "http://localhost:3002";

      try {
        // Apply Module Federation plugin only for client-side
        config.plugins.push(
          new NextFederationPlugin({
            name: "shell",
            filename: "static/chunks/remoteEntry.js",
            remotes: {
              admin: `admin@${adminUrl}/_next/static/chunks/remoteEntry.js`,
              customer: `customer@${customerUrl}/_next/static/chunks/remoteEntry.js`,
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
      } catch (error) {
        console.warn("Module Federation plugin error:", error.message);
      }
    }

    return config;
  },
};

module.exports = nextConfig;
