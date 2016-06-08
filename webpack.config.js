var webpack = require('webpack'),
	prefix = require('postcss-prefix-selector'),
	autoprefixer = require('autoprefixer')

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		'cout-embauche-simple': './entry-simple.js',
		'bootstrap-compat': './widget-simple/compat/entry-bootstrap.js',
		'cout-embauche': [
			'webpack-dev-server/client?http://localhost:3000/',
			'webpack/hot/only-dev-server',
			'react-hot-loader/patch',
			'babel-polyfill',
			'./entry-complete.js',
		],
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
		} ],
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// in order to use the fetch polyfill:
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
	],
}
