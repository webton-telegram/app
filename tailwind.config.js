const { nextui } = require('@nextui-org/react');
const { colors } = require('./src/styles/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), nextui()],
};
