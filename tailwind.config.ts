import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#174A83',
          'blue-hover': '#123a67',
          'blue-light': '#e8f0f8',
          red: '#D62836',
          'red-hover': '#b81d29',
          'red-light': '#fbe9ea',
          navy: '#102B46',
          'navy-light': '#16395c',
          'navy-dark': '#0a1b2d',
          grey: '#F3F6FA',
          slate: '#344054',
          'slate-light': '#64748b',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
