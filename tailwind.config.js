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
          indigo: {
              '50': '#f1f8f5',
              '100': '#ddeee5',
              '200': '#bdddce',
              '300': '#91c4b0',
              '400': '#62a58d',
              '500': '#418871',
              '600': '#2f6c59',
              '700': '#285c4d',
              '800': '#20453b',
              '900': '#1b3931',
              '950': '#0e201c',
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
          lavender: {
              '50': '#faf7fd',
              '100': '#f4ecfb',
              '200': '#ebddf7',
              '300': '#dbc2f0',
              '400': '#c69ae6',
              '500': '#b57edc',
              '600': '#9955c8',
              '700': '#8442ae',
              '800': '#6f3a8f',
              '900': '#5b3073',
              '950': '#3d1853',
          },
          chestnut: {
              '50': '#fcf4f4',
              '100': '#f9e7e7',
              '200': '#f4d4d4',
              '300': '#ecb5b5',
              '400': '#dd8383',
              '500': '#cf6464',
              '600': '#ba4848',
              '700': '#9c3939',
              '800': '#823232',
              '900': '#6d2f2f',
              '950': '#3a1515',
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

