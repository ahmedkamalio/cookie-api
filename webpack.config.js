const path = require('path');
const root = require('app-root-path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: root.resolve(path.join('build', 'index.js')),
    devtool: 'source-map',
    output: {
      filename: 'cookie-api.js',
      path: root.resolve(path.join('build', 'umd')),
      library: 'CookieAPI'
    },
    plugins: [new CompressionPlugin()]
  },
  {
    mode: 'production',
    entry: root.resolve(path.join('build', 'index.js')),
    devtool: 'source-map',
    output: {
      filename: 'cookie-api.min.js',
      path: root.resolve(path.join('build', 'umd')),
      library: 'CookieAPI'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: { output: { comments: false } }
        })
      ]
    },
    plugins: [new CompressionPlugin()]
  }
];
