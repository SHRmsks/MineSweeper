/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        title: "#842A3B",
        monkey: "#00FF00",
      },
      fontFamily: {
        titlefont: "titlefont",
        selection: "Selection",
      },
    },
  },
};
