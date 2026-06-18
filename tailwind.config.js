
// config/tailwind.config.js  (or tailwind.config.js in root)
module.exports = {
  // content = where Tailwind scans for class names
  // MUST include every file that uses Tailwind classes
  content: [
    "./app/views/**/*.html.erb",
    "./app/javascript/**/*.js",     
    "./app/helpers/**/*.rb",      
    "./app/components/**/*.rb",      
    "./app/components/**/*.html.erb",
  ],

  theme: {
    extend: {
      // Add your custom design tokens here:
      colors: {
        brand: {
          50:  "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },

  plugins: [
    // Optional plugins:
    require("@tailwindcss/forms"),      
    require("@tailwindcss/typography"), 
    require("@tailwindcss/aspect-ratio")
  ],
}