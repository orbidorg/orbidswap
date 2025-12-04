import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@base-org/account': false,
      '@coinbase/wallet-sdk': false,
      '@gemini-wallet/core': false,
      '@metamask/sdk': false,
      'porto': false,
      'porto/internal': false,
    };
    return config;
  },
};

export default nextConfig;
