// postcss.config.cjs
module.exports = {
  plugins: {
    // Use the new Tailwind PostCSS plugin instead of tailwindcss directly
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
