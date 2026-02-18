const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/kalogirou-home-goods' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
