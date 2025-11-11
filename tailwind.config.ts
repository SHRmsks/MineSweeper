/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        title: "#842A3B",
        selection: "#63360c",
        button: "#5f7864"
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        popIn: 'popIn 1s ease-out forwards', 
      },
      fontFamily: {
        titlefont: "titlefont",
        selection: "Selection",
      },
    },
  },
};
