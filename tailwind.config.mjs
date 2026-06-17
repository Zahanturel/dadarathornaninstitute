/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        institute: {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e4d9cc',
          700: '#5c4a42',
          800: '#3d2e28',
          900: '#2a201c',
          950: '#1a1410',
        },
        terracotta: {
          50: '#fdf4f2',
          100: '#fae8e4',
          200: '#f4cfc7',
          300: '#d97a68',
          400: '#c4624f',
          500: '#a34b3a',
          600: '#8f3f30',
          700: '#7a3629',
        },
        cream: {
          50: '#faf7f2',
          100: '#f5f0e6',
          200: '#ebe3d4',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px rgba(42, 32, 28, 0.06)',
        card: '0 4px 24px rgba(42, 32, 28, 0.08)',
        header: '0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(26, 20, 16, 0.15)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
};
