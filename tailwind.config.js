/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#000000',
        'cyber-blue': '#00f3ff',
        'cyber-green': '#00ff9d',
      },
      fontFamily: {
        'terminal': ['Share Tech Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}