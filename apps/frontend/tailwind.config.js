/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
        },
        background: {
          DEFAULT: "rgb(var(--background))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
        },
      },
    },
  },
  plugins: [],
};
