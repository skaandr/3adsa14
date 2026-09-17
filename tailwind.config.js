/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f0f11",
          card: "#18181c",
        },
        accent: "#f97316",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(249, 115, 22, 0.18)",
      },
    },
  },
  plugins: [],
};
