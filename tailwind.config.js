/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#EFF6FF',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Sarabun', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

