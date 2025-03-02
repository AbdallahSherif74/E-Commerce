/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      "color1":"#186cb8",
      "color2":"#2a9a9f",
      "color3":"#f98d00",
      "color4":"#e83611",
      "color5":"#f1b211"

    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode:"selector"
}

