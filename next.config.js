/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: isProd ? "export" : undefined, // Use static export only for production builds
    images: { unoptimized: true }, // Required for static export (we use canvas anyway)
    trailingSlash: isProd, // GitHub Pages needs this for clean URLs in production
};
module.exports = nextConfig;
