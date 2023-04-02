const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Dẫn tới file index.js ta đã tạo
  output: {
    path: path.join(__dirname, '/static/js'), // Thư mục chứa file được build ra
    filename: 'bundle.js', // Tên file được build ra
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ['babel-loader'],
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],

  devServer: {
    port: 8085,
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
    },
    proxy: {
      '/api': 'http://localhost:8080',
    },
    compress: true,
    allowedHosts: ['all'],
  },
  mode: 'development',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
