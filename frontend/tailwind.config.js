module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using standard RGB colors instead of oklch
        purple: {
          400: 'rgb(192, 132, 252)',
          500: 'rgb(168, 85, 247)',
          600: 'rgb(147, 51, 234)',
          700: 'rgb(126, 34, 206)',
        },
        // Add other colors as needed
      },
    },
  },
  plugins: [],
}