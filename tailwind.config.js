/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        blue1: 'rgb(65, 160, 250)',
        blue2: 'rgb(82, 178, 254)',
        white1: 'rgb(255, 255, 255)',
        tileColor: 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

