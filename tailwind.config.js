/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

// Since we are taking templates from Tailwind UI and they all use indigo as primary color,
// hardcoded in their classes, in this contingency it is more convenient to alias "indigo" with color valued that
// are actually a brand green and yellow. Ideally, we should create two new custom colors "brand-green" and "brand-yellow",
// and replace those in all the classnames within the project; alternative, we should completely review the whole design system
// to be more scalable. This solution instead is not elegant, but for now it works.

export default {
  content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx,html,htm}'
  ],
  theme: {
      colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          white: colors.white,
          gray: colors.gray,
          emerald: colors.emerald,
          //indigo: colors.indigo,
          //yellow: colors.yellow,
          indigo: {
              '50': '#f4f9f7',
              '100': '#daede4',
              '200': '#b5dac9',
              '300': '#88c0a8',
              '400': '#5fa287',
              '500': '#46866e',
              '600': '#366b58',
              '700': '#2e5749',
              '800': '#28473d',
              '900': '#253c35',
              '950': '#183029',
          },
          yellow: {
              '50': '#fdf9ef',
              '100': '#f9f0db',
              '200': '#f2dbaf',
              '300': '#ebc686',
              '400': '#e2a555',
              '500': '#db8c34',
              '600': '#cd7529',
              '700': '#aa5b24',
              '800': '#884924',
              '900': '#6e3d20',
              '950': '#3b1d0f',
          },


      },
      extend: {
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

