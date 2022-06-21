const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        spaceRegular: ['"ABCFavorit Regular"', "sans-serif"],
        spaceBold: ['"ABCFavorit Bold"', "sans-serif"],
      },
      colors: {
        primary: "#10B981",
        secondary: "#064E3B",
        background: "#EAEAEA",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
