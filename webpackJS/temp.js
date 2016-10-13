define(['package/lib'], function(lib) {

	function foo() {
		lib.log('hello world!');
	}

	return {
		foo: foo
	};
});

define(function(require, exports, module) {
	var someModule = require("someModule");
	var anotherModule = require("anotherModule");
	someModule.doTehAwesome();
	anotherModule.doMoarAwesome();
	exports.asplode = function() {
		someModule.doTehAwesome();
		anotherModule.doMoarAwesome();
	};
});

var someModule = require("someModule");
var anotherModule = require("anotherModule");
someModule.doTehAwesome();
anotherModule.doMoarAwesome();
exports.asplode = function() {
	someModule.doTehAwesome();
	anotherModule.doMoarAwesome();
};

var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	//插件项
	plugins: [commonsPlugin],
	//页面入口文件配置
	entry: {
		index: './src/js/page/index.js'
	},
	//入口文件输出配置
	output: {
		path: 'dist/js/page',
		filename: '[name].js'
	},
	module: {
		//加载器配置
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.js$/,
			loader: 'jsx-loader?harmony'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass?sourceMap'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}]
	},
	//其它解决方案配置
	resolve: {
		root: 'E:/github/flux-example/src', //绝对路径
		extensions: ['', '.js', '.json', '.scss'],
		alias: {
			AppStore: 'js/stores/AppStores.js',
			ActionType: 'js/actions/ActionType.js',
			AppAction: 'js/actions/AppAction.js'
		}
	}
};

{
	entry: {
		page1: "./page1",
		//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
		page2: ["./entry1", "./entry2"]
	},
	output: {
		path: "dist/js/page",
		filename: "[name].bundle.js"
	}
}

module: {
	//加载器配置
	loaders: [
		//.css 文件使用 style-loader 和 css-loader 来处理
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
		//.js 文件使用 jsx-loader 来编译处理
		{
			test: /\.js$/,
			loader: 'jsx-loader?harmony'
		},
		//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
		{
			test: /\.scss$/,
			loader: 'style!css!sass?sourceMap'
		},
		//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
		{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}
	]
}

esolve: {
	//查找module的话从这里开始查找
	root: 'E:/github/flux-example/src', //绝对路径
	//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
	extensions: ['', '.js', '.json', '.scss'],
	//模块别名定义，方便后续直接引用别名，无须多写长长的地址
	alias: {
		AppStore: 'js/stores/AppStores.js', //后续直接 require('AppStore') 即可
		ActionType: 'js/actions/ActionType.js',
		AppAction: 'js/actions/AppAction.js'
	}
}


module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    path: __dirname + '/assets/',
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      {test: /.css$/, loader: 'style!css'},
      {test: /.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
  resolve: {
extensions: ['', '.js', '.jsx'],
//模块别名定义，方便后续直接引用别名，无须多写长长的地址
alias: {
    a : 'js/assets/a.js',  // 后面直接引用 require(“a”)即可引用到模块
    b : 'js/assets/b.js',
    c : 'js/assets/c.js'
}
  },
  plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")]
}