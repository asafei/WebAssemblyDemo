const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//打包文件的入口文件
  entry: './src/index.js',
  	//生成可调试源码的映射
  devtool: 'source-map',
  	//打包输出文件名，及路径
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  	//配置本地web服务器的相关参数
  devServer:{
  	port: 3030,
  	progress: true,
  	contentBase: './dist'
  },
  module:{
    rules:[
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        loaders: ['wasm-loader']
      }

    ]
  },
  	//插件配置，HtmlWebpackPlugin可以将template文件引入打包生成的main.js文件，并产出index.html
  plugins:[
  	new HtmlWebpackPlugin({
  		template:'./dist/template.html',
  		filename:'./index.html'
  	})
  ]
};
