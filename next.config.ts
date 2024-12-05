import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true
};

module.exports = {
  compiler: {
    // Remove all console logs, excluding error logs
    removeConsole: { exclude: ["error"] }
  }
};

export default nextConfig;
