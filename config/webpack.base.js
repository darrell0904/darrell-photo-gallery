const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        // 使用 babel-loader 来编译处理 js 和 jsx 文件
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }, {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.(ts|tsx)?$/,
        include: path.join(__dirname , 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'tslint-loader',
          options: {},
        }],
      }
    ]
  },
};