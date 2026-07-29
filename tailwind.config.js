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
          DEFAULT: "#00a693",
          hover: "#009b89",
          light: "#f2fffd",
        },
        success: "#00ab97",
        error: "#005148",
        info: "#00bba6",
        ink: {
          900: "#04211d",
          700: "#0c3a34",
          500: "#3a615c",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,166,147,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,147,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        floatY: "floatY 4s ease-in-out infinite",
        pulseRing: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
