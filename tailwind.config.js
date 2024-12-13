/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        backgroundImage: {
            'candy-cane': 'repeating-linear-gradient(45deg, #fff 0%, #fff 10%, #ff4d4d 10%, #ff4d4d 20%)',
          },
    },
  },
  plugins: [],
}
