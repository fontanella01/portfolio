import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A raiz abre em português; /en é a versão em inglês.
  async redirects() {
    return [{ source: "/", destination: "/pt", permanent: false }];
  },
};

export default nextConfig;
