module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        19: "4.75rem",
        25: "6.25rem",
        165: "41.25rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
