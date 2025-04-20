/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/en/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nhl.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.nhle.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.nhl.bamgrid.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.nhl.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
    domains: ['tsnplafhddbeqbqlhywv.supabase.co', 'raw.githubusercontent.com'],
  },
  // Enable static exports if needed
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 