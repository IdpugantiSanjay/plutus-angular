const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.65rem',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      flexShrink: { 2: 2 },
      maxWidth: { '1/2': '50%', '3/4': '75%', '1/3': '33.33%', '1/4': '25%' },
      width: { '1/2': '50%', '4/6': '60%', '2/6': '40%' },
      boxShadow: {
        inset: 'inset 0 -4px 0 rgb(0 0 0 / 30%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        wiggle: 'wiggle .2s ease-in-out',
        'scale-in': 'scaleIn 1s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scaleIn: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        }
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
