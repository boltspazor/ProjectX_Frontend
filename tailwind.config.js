/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#770524',
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a8b8',
          400: '#ec7591',
          500: '#e0486e',
          600: '#cd2b56',
          700: '#ae1e46',
          800: '#911c3f',
          900: '#7c1c3a',
          950: '#770524',
        },
        secondary: {
          DEFAULT: '#E4BB7A',
          50: '#fdf8f0',
          100: '#faf0db',
          200: '#f5dfb6',
          300: '#efc887',
          400: '#E4BB7A',
          500: '#d59d4f',
          600: '#c78344',
          700: '#a56639',
          800: '#865333',
          900: '#6e442c',
          950: '#3b2316',
        },
      },
    },
  },
  plugins: [],
}

