module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "16px": "16px",
        "72px": "72px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
