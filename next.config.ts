import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Раскомментируйте basePath если репозиторий называется не так же как ваш GitHub username
  basePath: "/valentines",
  trailingSlash: true,
};

export default nextConfig;
