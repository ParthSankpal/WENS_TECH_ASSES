/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Higuen:"Higuen",
      Norwester:'Norwester',
      Rubik:['sans-serif'],
      Tilt_Prism:['cursive'],
      Outfit:['sans-serif'],
      Raleway : ['sans-serif']
    },
  },
  // plugins: [
  //   require('@tailwindcss/line-clamp'),
  // ],
}