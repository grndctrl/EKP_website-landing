const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require(path.resolve(__dirname, 'config/theme.json'))

module.exports = {
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(path.resolve(__dirname, 'wp-content/themes', config.slug)),
    new CopyWebpackPlugin([{
      from: 'theme/public',
      to: ''
    }, {
      from: 'theme/vendor',
      to: 'vendor'
    }]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,

      include: [path.resolve(__dirname, 'src')],

      loader: 'babel-loader',
      options: {
        plugins: ['syntax-dynamic-import'],
        presets: [
          [
            '@babel/preset-env', {
              modules: false
            }
          ]
        ]
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(css|pcss)$/,

      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: (resourcePath, context) => {
            // publicPath is the relative path of the resource to the context
            // e.g. for ./css/admin/main.css the publicPath will be ../../
            // while for ./css/main.css the publicPath will be ../
            return path.relative(path.dirname(resourcePath), context) + '/'
          }
        }
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader'
      }]
    }, {
      test: /\.(svg|png|jpg)$/,

      use: {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          publicPath: '../'
        }
      }
    }]
  },

  entry: {
    theme: './theme/src/index.js',
    head: './theme/src/head.js',
    app: './theme/src/app.js',

  },

  output: {
    path: path.resolve(__dirname, 'wp-content/themes', config.slug),
    filename: 'js/[name].js'
  },

  mode: 'development',

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         priority: -10,
  //         test: /[\\/]node_modules[\\/]/
  //       }
  //     },

  //     chunks: 'async',
  //     minChunks: 1,
  //     minSize: 30000,
  //     name: true
  //   }
  // }
}
