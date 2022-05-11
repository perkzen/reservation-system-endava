module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#31363B',
        secondary: '#EEEEEE',
        accent: '#DE411B',
        textLight: '#808080',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
