/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      colors: {
        facebook: "#3B5998",
        google: "#DB3236",
        discord: "#7289DA",
      },
      height: {
        "vh": "100vh"
      }
    },
  },
  plugins: [],
};
