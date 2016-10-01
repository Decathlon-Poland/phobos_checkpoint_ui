/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],

  style: {
    cssModules: false
  },

  webpack: {
    output: {
      publicPath: '/'
    },
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
      '/v1/*': {
        target: 'http://localhost:9292',
        secure: false
      }
    }
  }
}
