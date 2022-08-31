const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",

    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      borderRadius: {
        middle: "0.1875rem",
      },

      colors: {
        primary: "#7CC6FE",

        active: "#3BA55D",

        "url-link": "#0068E0",

        "channel-link": "#505CDC",

        "channel-link-background": "#5865F2",
      },

      fontFamily: {
        sans: ["PT Sans", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        double: ["2rem", "2.5rem"],
      },

      spacing: {
        1.25: "0.3125rem",

        7.5: "1.875rem",

        9.5: "2.375rem",

        15: "3.75rem",

        17.5: "4.375rem",

        18: "4.5rem",

        18.5: "4.625rem",

        19: "4.75rem",

        19.5: "4.875rem",

        20.5: "5.125rem",

        21: "5.25rem",

        25: "6.25rem",

        30: "7.5rem",

        50: "12.5rem",

        56.5: "14.125rem",

        102: "25.5rem",

        110: "27.5rem",

        120: "30rem",

        140.5: "35.125rem",

        165: "41.25rem",

        196: "49rem",
      },
    },
  },

  plugins: [],

  safelist: [
    "text-url-link",
    "text-channel-link",
    "bg-channel-link-background/[0.15]",
    "hover:bg-channel-link-background/100",
  ],
};
