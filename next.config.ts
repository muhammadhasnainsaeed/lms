import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co", "res.cloudinary.com", "images.unsplash.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
