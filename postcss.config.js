module.exports = ({ options }) => ({
  ident: 'postcss',
  syntax: 'postcss-scss',
  map: {
      'inline': true,
  },
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-advanced-variables': {},
    'tailwindcss': 'tailwind.config.js',
    'autoprefixer': {},
    'postcss-object-fit-images': {},
    '@fullhuman/postcss-purgecss': options.purgecss,
    'cssnano': options.cssnano
  }
})