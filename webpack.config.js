var webpack = require('webpack'),
	prefix = require('postcss-prefix-selector'),
	autoprefixer = require('autoprefixer'),
	inProd = process.env.NODE_ENV == 'production'

module.exports = {
	devtool: 'cheap-module-source-map',
	entry:
		inProd ?
			{
				'cout-embauche': [
					'babel-polyfill',
					'./entry-complete.js'
				],
				'simulateur': './entry-iframe.js',
			}	: {
				'cout-embauche': [
					'webpack-dev-server/client?http://localhost:3000/',
					'webpack/hot/only-dev-server',
					'react-hot-loader/patch',
					'babel-polyfill',
					'./entry-complete.js',
				],
				'simulateur': './entry-iframe.js',
			},
	output: {
		path: require('path').resolve('./dist/'),
		filename: '[name].js',
		publicPath: '/dist/',
	},
	module: {
		loaders: [ {
			test: /\.css$/,
			loader: 'style!css!postcss-loader',
		}, {
			test: /\.html$/,
			loader: 'html',
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'url?limit=10000!img?progressive=true',
		},
		{
			test: /\.yaml$/,
			loader: 'json!yaml',
		},
	],
	},
	postcss: [
		autoprefixer({
			browsers: [ '> 1% in FR', 'not ie < 10' ],
		}),
		/* prefix all style rules with the root html class
		to avoid disturbing the widget's host page */
		prefix({
			prefix: '.SGMAPembauche ',	// <--- notice the trailing space!
			exclude: [ '.SGMAPembauche' ],	// to style the prefix container itself
		}),
	],
	plugins: [
		!inProd && new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// in order to use the fetch polyfill:
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
	],
}
