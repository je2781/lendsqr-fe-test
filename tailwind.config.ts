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
        secondary: {400: "#39CDCC"},
        status: {
          pending: '#E9B200',
          active: '#39CD62',
          blacklisted: '#E4033B'
        },
        dashboard: {
          users: '#DF18FF',
          active: '#5718FF',
          loans: '#F55F44',
          savings: '#FF3366'
        }
      },
      fontFamily: {
        sans: ['var(--font-avenir-next)', 'sans-serif'],
        mono: ['var(--font-sf-compact)', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeOutLeft: {
          '0%': { opacity: 1, transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(-100%)' },
        },
        fadeInRight: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },  
          '100%': { opacity: 1, transform: 'translateX(0)' }, 
        },
        fadeOutRight: {
          '0%': { opacity: 1, transform: 'translateX(0)' },   
          '100%': { opacity: 0, transform: 'translateX(100%)' }, 
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 0.3s ease-out forwards',
        fadeOutLeft: 'fadeOutLeft 0.3s ease-in forwards',
        fadeInRight: 'fadeInRight 0.3s ease-out forwards',
        fadeOutRight: 'fadeOutRight 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
