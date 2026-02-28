/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',          // Generates a static /out folder
    images: { unoptimized: true }, // Required for static export (we use canvas anyway)
    trailingSlash: true,       // GitHub Pages needs this for clean URLs
};
module.exports = nextConfig;
