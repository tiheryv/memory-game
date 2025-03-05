/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#343434",
        secondary: "#CCB4FF",
        dark: "#ABBAE4",
        light: "#F2F2F2",
        neonGreen: "#BCFAD9",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "Arial", "sans-serif"],
        crt: ["'VT323'", "monospace", "Courier New", "serif"],
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};