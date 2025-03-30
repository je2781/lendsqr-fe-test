import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,scss,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#545F7D',
          500: "#213F7D",
        },
        secondary: {400: "#39CDCC", 800: '#2c3e50'},
        accent: "#20c997",
        checkout: {
          100: "#fef6f6",
          200: "rgb(227, 192, 183)",
          300: "rgb(216, 159, 142)",
        },
        detail: {
          100: 'rgba(20, 57, 151, 0.05)',
          500: '#143997'
        },
        action: "#0dcaf0",
      },
      fontFamily: {
        sans: ['AvenirNextLTPro', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
};
export default config;
