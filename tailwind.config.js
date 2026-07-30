/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A693",
          dark: "#063D39",
          accent: "#19D7C2",
          light: "#D8FFF8",
        },
        surface: {
          DEFAULT: "#F7FBFB",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #00A693 0%, #19D7C2 50%, #063D39 100%)",
        "brand-radial":
          "radial-gradient(60% 60% at 50% 40%, #19D7C2 0%, rgba(25,215,194,0) 70%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(6, 61, 57, 0.12)",
        "glass-lg": "0 20px 60px -10px rgba(6, 61, 57, 0.25)",
        glow: "0 0 40px rgba(25, 215, 194, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
