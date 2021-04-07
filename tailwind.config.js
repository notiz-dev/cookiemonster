module.exports = {
  purge: ['./src/**/*.{html,ts}','./projects/lib/src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight:{
        huge: '9999px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')
],
};
