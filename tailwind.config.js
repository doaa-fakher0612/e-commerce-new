/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "var(--primary-light)",
        primaryDark: "var(--primary-dark)",
        secondaryLight: "var(--secondary-light)",
        secondaryDark: "var(--secondary-dark)",
        base: "var(--base)",
      },
      scripts: {
        dev: "npx tailwindcss -i ./src/css/input.css -o ./src/css/output.css --watch",
      },
    fontFamily:{
      cairo: ['Cairo', 'sans-serif'],
    },
    fontWeight:{
      '200': 200,
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
      '800': 800,
      '900': 900, 
    }
    },
  },
  plugins: [],
};
