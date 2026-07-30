export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard"],
    },
    sitemap: "https://robotmarket.example.com/sitemap.xml",
  };
}
