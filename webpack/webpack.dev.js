/**
 * webpack 开发环境配置
 * 
 * **/

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  //设置模式----开发/生产
  mode: 'development',

  //设置 devtool，生成资源映射，方便DEBUG，开发环境用inline-source-map
  devtool: 'inline-source-map',

  //配置 webpack-dev-server  使用 webpack-dev-server 启动项目服务
  devServer: {
    historyApiFallback: true,
    overlay: true,        // 是否将错误展示在浏览器蒙层
    hot: true,
    open: false,
    host: '0.0.0.0',
    port: 9536,
    disableHostCheck:true,
    // 设置代理
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,  // target 中URL的协议为 https 时，需要设置这个参数
        target: 'https://easy-mock.com/mock/5f587209d5906660c22dae2e/personal',
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  },

  //插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //启用热加载

    // 提取 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    })
  ],
})

console.log("process.env.NODE_ENV 的值是(webpack.dev.js)：" + process.env.NODE_ENV)