module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#31363B',
        secondary: '#EEEEEE',
        accent: '#DE411B',
        textLight: '#808080',
        graySecondary: '#36444f',
        grayMenu: '#363E43',
        reserved: '#D1D5DB',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      screens: {
        xs: { max: '639px' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
