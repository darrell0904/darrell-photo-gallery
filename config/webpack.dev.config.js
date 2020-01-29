const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  mode: 'development', // 开发模式
  devtool: 'cheap-module-eval-source-map',
  entry: path.join(__dirname, '../example/src/app.js'), // 项目入口，处理资源文件的依赖关系
  output: {
    path: path.join(__dirname, "../example/src/"),
    filename: "bundle.js", // 使用 webpack-dev-sevrer 启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
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
        exclude: /\.min\.css$/,
        loader: [
          'style-loader',
          'css-loader',
          'typed-css-modules-loader',
        ],
      }, {
        test: /\.min\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "../src/components/photoGallery/fonts"),
        ],
        use: [
          'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
            options: {
              formatter: "prettier",
            }
          },
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
          // 'typed-css-modules-loader',
          'less-loader',
        ]
      }, {
        test: /\.less$/,
        include: path.resolve(__dirname, "../src/components/photoGallery/fonts"),
        use: [
          'style-loader',
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../example/src/'),
    compress: true,
    port: 3001, // 启动端口为 3001 的服务
    open: true // 自动打开浏览器
  },
};
module.exports = merge(devConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置
