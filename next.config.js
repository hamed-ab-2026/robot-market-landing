const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Next.js 14 loads its configuration as JavaScript.
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    transpilePackages: ['antd', '@ant-design/icons', 'rc-util', 'rc-pagination', 'rc-picker'],

    output: 'standalone',

    trailingSlash: true,

    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
};

module.exports = nextConfig;
