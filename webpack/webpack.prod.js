/**
 * webpack 生产环境配置
 * 
 * **/

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //JS代码压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  //CSS代码压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //抽离提取 CSS 代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  //设置模式----开发/生产
  mode: 'production',

  //设置 devtool，生成资源映射，方便DEBUG，生产环境用source-map
  devtool: 'source-map',
  // devtool: 'hidden-source-map'    //隐藏资源文件  正式上线时使用

  //插件配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css'
    }),

    //使用 DefinePlugin 插件定义当前为生产环境
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new CleanWebpackPlugin(),   //使用插件清理打包的 dist 目录
  ],

  optimization: {
    // 打包压缩js/css文件
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            // warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      }),
      // 压缩 CSS 代码
      new OptimizeCSSAssetsPlugin({})
    ],
    // 拆分公共模块
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)/,
          chunks: 'all',
          enforce: true,
          // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了
          // 那么将不会重新生成新的
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
     // 为每个仅含有 runtime 的入口起点添加一个额外 chunk
    runtimeChunk: true
  },

  //添加 stats 配置过滤打包时出现的一些统计信息。
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },

  //添加 performance 配置关闭性能提示
  performance: {
    hints: false
  },
})