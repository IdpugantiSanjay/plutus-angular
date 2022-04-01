module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      flexShrink: {
        '2': 2
      },
      maxWidth: {
        '1/2': "50%",
        '3/4': "75%"
      },
      width: {
        '1/2': "50%",
        '4/6': "60%",
        "2/6": "40%"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
