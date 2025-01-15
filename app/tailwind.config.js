import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Sucht nach Klassen in allen JS/TS/React-Dateien im src-Ordner
    "./public/index.html", // Bezieht auch die HTML-Dateien mit ein
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
