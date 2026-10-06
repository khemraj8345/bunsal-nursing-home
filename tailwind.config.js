export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0c2b48',
          teal: '#0284c7',
          lightTeal: '#e0f2fe',
          mint: '#dcfce7',
          mintText: '#15803d',
          bg: '#f6f8fd',
          border: '#e2e8f0',
          accent: '#0d9488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
