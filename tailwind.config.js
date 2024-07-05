/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F1EFFD",
          150: "#E4DFFB",
          200: "#D6D0F9",
          250: "#C9C0F7",
          300: "#AEA1F3",
          350: "#9382EF",
          400: "#7963EC",
          450: "#6250C3",
        },
        secondary: {
          100: "#F6F6F7",
          150: "#E4E4E7",
          200: "#CAC9D0",
          250: "#A7A5B2",
          300: "#6D6B74",
          350: "#6D6B74",
          400: "#242428",
        },
      },
    },
  },
  plugins: [],
};
