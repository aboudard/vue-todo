/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        cyan: '#dc0e0e',
      },
    },
  },
  plugins: [PrimeUI],
}
