const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      sans: ['Larken', 'sans-serif'],
    },
    colors: {
      primary: ' #ef4444',
      secondary: '#ffca58',
      white: "#ffffff"
    },
    extend: {},
  },
  plugins: [],
};
