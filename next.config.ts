import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true, // Statik export için şart
    },
    basePath: "/portfolio",
};

export default nextConfig;