/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
const { join } = require('path')
const env = process.env.NODE_ENV
const output = (env === 'production')
  ? { publicPath: '/assets/', path: join(__dirname, '../assets') }
  : { publicPath: '/' }

module.exports = {
  pages: ['index'],

  style: {
    cssModules: false
  },

  webpack: {
    output: output,
    module: {
      preLoaders: [
        {
          test: /src\/index\.scss/, // the main scss/css file
          loader: 'webpack-inject-css-loader?appPath=./src&debug=false'
        }
      ]
    },
    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  },

  develop: {
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:9292',
        secure: false
      },
      '/configs': {
        target: 'http://localhost:9292',
        secure: false
      },
      '/assets/*': {
        target: 'http://localhost:9292',
        secure: false
      }
    }
  }
}
