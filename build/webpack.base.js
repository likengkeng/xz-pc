const webpack = require('webpack');
const path = require('path');
// vue-loader 插件, 需配合 @vue/compiler-sfc 一块使用
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const forkTscheckerPlugin = new ForkTsCheckerWebpackPlugin({
  // typescript: {
  //   extensions: {
  //     vue: true,
  //   },
  //   memoryLimit: 1024 * 10,
  // }
});

module.exports = {
  entry: ['./src/pc/index.ts'],
  target: 'web',
  module: {
    rules: [
      // 处理vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|mp3|mp4)$/,
        use: [
          {
           loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // 处理vue
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    // 处理静态文件夹 static 复制到打包的 static 文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        ROUTER_BASE: '',
      },
    }),
    // 创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
    forkTscheckerPlugin,
  ],
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    alias: {
      '@': resolve('src')
    },
  },
}
