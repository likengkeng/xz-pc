const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    overlay: true,
    hot: true,
    stats: 'errors-only',
    compress: true, // 为每个静态文件开启 gzip compression
    port: 8001,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    proxy: {
      '/rng': {     //这里最好有一个 /
          target: 'http://182.61.5.103:9999/web/',  // 后台接口域名
          ws: true,        //如果要代理 websockets，配置这个参数
          secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true,  //是否跨域
          pathRewrite:{
              '^/rng':''
          }
      }
    }
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
  mode: 'development',
})
