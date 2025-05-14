/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    fontFamily: {
      sans: 'Helvetica, Arial, sans-serif',
      serif: 'Helvetica, Arial, sans-serif',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
