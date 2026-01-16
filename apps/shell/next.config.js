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

    // Apply Module Federation plugin only on client-side to avoid SSR/build issues
    // Remote modules are loaded client-side only (ssr: false in dynamic imports)
    if (!isServer) {
      try {
        const mfPlugin = new NextFederationPlugin({
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
        });

        config.plugins.push(mfPlugin);
      } catch (error) {
        console.warn("Module Federation plugin error:", error.message);
      }
    } else {
      // On server-side, mark remotes as externals to prevent build-time resolution
      // These modules are only loaded client-side, so server doesn't need them
      const originalExternals = config.externals;
      config.externals = [
        ...(Array.isArray(originalExternals) ? originalExternals : originalExternals ? [originalExternals] : []),
        ({ request }, callback) => {
          if (request && (request.startsWith('admin/') || request.startsWith('customer/'))) {
            // Mark as external - these are loaded client-side only via Module Federation
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ].filter(Boolean);
    }

    return config;
  },
};

module.exports = nextConfig;
