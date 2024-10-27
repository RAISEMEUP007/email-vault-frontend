/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth : {
        '1512px' : '1512px',
      },
      maxHeight : {
        '982px' : '982px',
      },
    },
  },
  plugins: [],
}

