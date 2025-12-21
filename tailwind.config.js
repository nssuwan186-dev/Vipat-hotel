/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#13c8ec",
        "background-light": "#f6f8f8",
        "background-dark": "#101f22",
        "surface-dark": "#192f33",
        "surface-darker": "#111f22",
        "card-dark": "#1a2c30",
        "border-dark": "#325e67",
        "text-secondary": "#92c0c9"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        "lg": "1rem",
        "xl": "1.5rem"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
