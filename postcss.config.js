const _ = require('lodash')
const tailwind = require('./tailwind.config.js')

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './theme/src/**/*.vue',
    './theme/templates/**/*.twig'
  ],
  whitelistPatterns: [/barba-/],
  whitelistPatternsChildren: [/header-main/],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

const functionsOptions = {
  functions: {
    themeToBase: function (path) {
      let value = _.get(tailwind.theme, _.trim(path, `'"`))

      if (value.includes('px')) {
        return parseFloat(value.slice(0, -2))
      }

      if (value.includes('rem')) {
        return parseFloat(value.slice(0, -3)) * 16
      }

      return 16
    }
  }
}

module.exports = {
  ident: 'postcss',
  syntax: 'postcss-scss',
  map: {
    inline: true
  },
  plugins: [
    require('postcss-import'),
    require('postcss-for'),
    require('postcss-functions')(functionsOptions),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-easings'),
    require('postcss-advanced-variables'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-calc'),
    require('postcss-object-fit-images'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')] : [])
  ]
}
