/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}
