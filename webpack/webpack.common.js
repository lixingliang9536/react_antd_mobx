/**
 * webpack 公共配置
 * 
 * **/

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');  //此插件可以在命令行展示更友好的提示功能
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer'); //postcss-loader中的方法，用来为CSS自动添加前缀。

module.exports = {
  //入口文件
  // entry:path.resolve(__dirname, '../src/index.js'),
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
    common: ['react', 'react-dom', 'react-router-dom', 'mobx']
  },

  //输出文件
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },

  //插件配置
  plugins: [
    // 自动在dist目录生成 html 并自动引入 js 文件
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), //模板路径
      favicon: path.resolve(__dirname, '../images/favicon.jpg'),  //浏览器标题上的图标
      filename: 'index.html'
    }),

    // 在命令行展示更清晰地提示信息
    new FriendlyErrorsWebpackPlugin(),
  ],

  //依赖模块配置相关
  module: {
    rules: [
      //配置JS / JSX 解析
      {
        test: /\.(js|jsx)$/,
        //设置 cacheDirectory 属性，指定的目录缓存 loader 的执行结果，
        //来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程
        loader: 'babel-loader?cacheDirectory',
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },

      //配置CSS样式解析
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            // 使用 MiniCssExtractPlugin.loader 代替 style-loader
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,   //关闭CSS模块化
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },

      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [
          {
            // 使用 MiniCssExtractPlugin.loader 代替 style-loader
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },

      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },

      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },

      // 解析XML
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },

      // 解析 MakeDown 文件
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ]
  },

  //文件别名配置
  resolve: {
    //配置别名
    alias: {
      '@': path.resolve(__dirname,'../src'),
      img: path.resolve(__dirname,'../images'),
      utils: path.resolve(__dirname, '../src/Utils'),
      components: path.resolve(__dirname, '../src/Components'),
    },
    //设置模块查找范围
    modules: [path.resolve(__dirname, '../node_modules')],
    //配置省略后缀
    extensions: ['.js','.json']
  }
}