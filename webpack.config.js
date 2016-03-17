var webpack = require('webpack'),
	prefix = require('postcss-prefix-selector'),
	autoprefixer = require('autoprefixer')


module.exports = {
	entry: {
		'cout-embauche-widget': './widget.js',
		'bootstrap-compat': './js/compat/bootstrap.js',
	},
	output: {
		path: 'dist',
		filename: '[name].js',
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
		],
	},
	postcss: [
		autoprefixer({
			browsers: [ '> 1% in FR', 'not ie < 10' ],
		}),
		prefix({
			prefix: '.SGMAPembauche ',	// <--- notice the trailing space!
			exclude: [ '.SGMAPembauche' ],	// to style the prefix container itself
		}),
	],
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'cout-embauche-widget',
			filename: 'cout-embauche-widget.js',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'bootstrap-compat',
			filename: 'bootstrap-compat.js',
			async: true,
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
	],
}
