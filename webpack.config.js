/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('node:path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // 'production' , 'development'

  entry: {
    index: `./src/ts/index.ts`,
  },

  output: {
    path: path.resolve(__dirname, 'dist/assets/js'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};
