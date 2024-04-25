/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azulFuerte: "#0085A1",
        azulClaro: "#04B6CC",
        blanco: "#F5F5F5",
        naranja: "#F25835",
      },
    },
  },
  plugins: [],
};
