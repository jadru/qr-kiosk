/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        'cute-font': ['Hi Melody', ...defaultTheme.fontFamily.sans],
        'nato-font': ['Nato Sans', ...defaultTheme.fontFamily.sans],
        'vintage-font': ['Song Myung', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-blue': '#015EFF',
      },
      backgroundImage: {
        cute: "url('/background/cute_bg.jpg')",
        vintage: 'url(/background/vintage_bg.jpeg)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    darkTheme: 'winter',
  },
};
