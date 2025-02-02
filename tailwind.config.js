/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Noto Sans', 'Segoe UI', 'sans-serif'],
      },
      fontWeight: {
        light: 100,
        regular: 400,
        bold: 700,
      },
      colors: {
        titleBlue: '#0078D4',
        backgroundWhite: '#FFFFFF',
        tabGray: '#F0F0F0',
        barGray: '#CDCDCD',
        borderGray: '#B0B0B0',
        buttonGray: '#E1E1E1',
        backgroundYellow: '#FFF4C4',
        barYellow: '#F9ECA8',
        selectedYellow: '#FFD264',
        fontBlack: '#000000',
        fontGray: '#D4D4D4',
        // alternative gray: #A5A5A5
        fontBlue: '#005A9E',
        // alternative blue: #0078D4
        backgroundBlue: '#E6F0FF',
      },
    },
  },
  plugins: [],
}
