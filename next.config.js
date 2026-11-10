// GitHub Pages serves a project site from a sub-path, e.g. /runewars-fate.
// The deploy workflow sets this; it stays empty for local development.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
};

module.exports = nextConfig;
