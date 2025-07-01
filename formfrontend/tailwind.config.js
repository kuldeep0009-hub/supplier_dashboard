/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 👈 this line is required for dark mode toggle to work
  theme: {
    extend: {},
  },
  plugins: [],
};
