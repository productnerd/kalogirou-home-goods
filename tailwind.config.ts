import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        background: '#FAF9F7',
        surface: '#F5F0EB',
        foreground: '#2C2C2C',
        muted: '#6B6B6B',
        accent: {
          DEFAULT: '#B8956A',
          hover: '#9A7B54',
          light: '#F0E6D6',
        },
        border: '#E5DDD3',
        success: '#6B8F71',
        error: '#C75050',
      },
    },
  },
  plugins: [],
};
export default config;
