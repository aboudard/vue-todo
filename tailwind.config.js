/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    colors: {
      sky: {
        50: '#fdfbe9',
        100: '#fcf9c5',
        200: '#fbf08d',
        300: '#f8e04c',
        400: '#f3cd1c',
        500: '#e6b70f',
        600: '#c48d0a',
        700: '#9c650c',
        800: '#815012',
        900: '#6e4115',
        950: '#402108',
      },
    },
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
    },
  },
  plugins: [PrimeUI],
}
