module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "72px": "72px",
        "240px": "240px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
