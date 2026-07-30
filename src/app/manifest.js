export default function manifest() {
  return {
    name: "روبات مارکت",
    short_name: "روبات مارکت",
    description: "دستگاه‌های وندینگ ماشین یخچالدار هوشمند روبات مارکت",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBFB",
    theme_color: "#00A693",
    lang: "fa",
    dir: "rtl",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
