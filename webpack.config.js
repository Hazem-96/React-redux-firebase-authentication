const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
      filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ , query:{ presets:['react']}},
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query:{ presets:['react']} },
        {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize'
            ]
        }]
  },
    devServer: {
        historyApiFallback: true
    },
  plugins: [ HtmlWebpackPluginConfig]
};