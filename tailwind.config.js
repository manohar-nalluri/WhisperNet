/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      // ...
      keyframes: {
        beamMask: {
          from: { x: "-100%" },
          to: { x: "100%" },
        },
      },
      animation: {
      // ...
        beamMask: "beamMask 2s linear infinite",
      },
    },
  },  plugins: [],
}

