/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
    reactStrictMode: true,
    // AntD ships CJS + uses some patterns that benefit from transpilation in the App Router.
    transpilePackages: ['antd', '@ant-design/icons', 'rc-util', 'rc-pagination', 'rc-picker'],


    output: 'export',

    images: {unoptimized: true},

    trailingSlash: true,

    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
};

module.exports = nextConfig;
