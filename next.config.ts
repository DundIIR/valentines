import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Раскомментируйте basePath если репозиторий называется не так же как ваш GitHub username
  basePath: isProd ? "/valentines" : "",
  trailingSlash: true,
};

export default nextConfig;
