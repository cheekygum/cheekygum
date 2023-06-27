/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    container: {
      center: true,
      padding: '0.75rem',
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        red: '#E61439',
        violet: '#840181',
        blue: '#211CC1',
        purple: '#DB30B0',
        'purple-light': '#FFBDED',
      },
      fontFamily: {
        'ravie': ['Ravie'],
      },
    },
  },
  plugins: [],
}
