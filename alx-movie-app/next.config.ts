import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  // optional minimal tweaks you can enable later if needed:
  // register: true,
  // skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // you mentioned using media from IMDb/Amazon
    domains: ["m.media-amazon.com"],
  },
};

export default withPWA({
  ...nextConfig,
});
