/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      width:{
        '88px' : '88px',
      },
      height:{
        '88px' : '88px',
      },
      maxWidth : {
        '1512px' : '1512px',
        '874px' : '874px',
      },
      maxHeight : {
        '982px' : '982px',
        '467px' : '467px'
      },
      spacing: {
        '45px': '45px',
        '38px': '38px',
      },
      colors: {
        evPurple: '#571459',
        evPurpleAlt: '#8D348E',
        evPurpleDisable: '#E6DDE7',
        evTextColor: '#000000CC',
        evGray: '#6C757D',
        evGrayLight: '#777777CC',
        evLight: '#DADADA',
        evError: '#FC5A5A',
        evSuccess: '#42A496',
        evWarning: '#FDC23A',
      },
    },
  },
  plugins: [],
}