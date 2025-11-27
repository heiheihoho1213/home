/** @type {import('next').NextConfig} */
const repoName = 'home';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true
};

export default nextConfig;

