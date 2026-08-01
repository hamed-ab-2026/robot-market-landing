/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00a693',
          50: '#e6f7f4',
          100: '#c0ebe3',
          200: '#8fdccc',
          300: '#5cccb4',
          400: '#2eba9c',
          500: '#00a693',
          600: '#008c7c',
          700: '#017065',
          800: '#08554e',
          900: '#0b3d38',
          950: '#062522',
        },
        ink: {
          950: '#04120f',
          900: '#071e19',
          800: '#0c2b24',
        },
      },
      fontFamily: {
        vazir: ['var(--font-vazirmatn)', 'Tahoma', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
      boxShadow: {
        brandGlow: '0 0 60px -10px rgba(0, 166, 147, 0.55)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
