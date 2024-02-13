/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./HTML/*.html'],
  theme: {
    extend: {
      spacing: {
        '8.25rem': '8.25rem',
        '12.3rem': '12.3rem',
        '22rem': '22rem',
        '4.6rem':'4.6rem'
      },
      backgroundColor: {
        'custom-green': '#00FF41',
        'custom-black': '#222225'
      },
      textColor:{
        'custom-black': '#222225'
      },
      accentColor:{
        'custom-black': '#222225'
      }
    },
  },
  plugins: [],
}

