/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        root_img:
          "https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg",
      },
      colors: {
        primary: "rgba(0,0,0,0.54)",
      },
    },
  },
  plugins: [],
};
