const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production', // 开发模式
  entry: path.join(__dirname, "../src/components/photoGallery/index"),
  output: {
    path: path.join(__dirname, "../lib/"),
    filename: "index.js",
    libraryTarget: 'umd', // 采用通用模块定义
    libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
  },
  resolve: {
    // 一定不要忘记配置ts tsx后缀
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@utils': path.resolve('./src/utils'), // 这样配置后 utils 可以指向 src/utils 目录
      '@images': path.resolve('./src/images'), // 这样配置后 utils 可以指向 src/images 目录
      '@components': path.resolve('./src/components'), // 这样配置后 utils 可以指向 src/images 目录
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules'
        ],
      },
      {
        test: /\.less$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "../src/components/photoGallery/fonts"),
        ],
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                },
                sourceMap: true,
                importLoaders: 2,
                localsConvention: 'camelCase'
            }
          },
          'less-loader',
        ],
      }, {
        test: /\.less$/,
        include: path.resolve(__dirname, "../src/components/photoGallery/fonts"),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      }, {
        test: /\.(eot|woff2?|woff|ttf|svg|otf)$/,
        use: ['file-loader'],
      }, {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name]_[hash:7].[ext]',
            outputPath: 'images/',
            esModule: false, // 出现图片 src 是 module 对象
          }
        }
      }, 
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css" // 提取后的css的文件名
    }),
    new CleanWebpackPlugin(),
  ],
  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
