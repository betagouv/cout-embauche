var webpack = require('webpack'),
	prefix = require('postcss-prefix-selector'),
	autoprefixer = require('autoprefixer'),
	prodEnv = process.env.NODE_ENV == 'production', // eslint-disable-line no-undef
	testEnv = process.env.NODE_ENV == 'test' // eslint-disable-line no-undef

var config = {
	devtool: 'cheap-module-source-map',
	entry: {
		'cout-embauche':
			(testEnv || prodEnv) ? [
				'babel-polyfill',
				'./source/entry.js'
			] : [
				'webpack-dev-server/client?http://localhost:3000/',
				'webpack/hot/only-dev-server',
				'react-hot-loader/patch',
				'babel-polyfill',
				'./source/entry.js',
			],
		'simulateur': './source/entry-iframe.js',
		'test': [
			'babel-polyfill',
			'./source/test/test.js'
		],
		'colour-chooser': [
			'babel-polyfill',
			'./source/entry-colour-chooser.js'
		]
	},
	output: {
		path: require('path').resolve('./dist/'),
		filename: '[name].js',
		publicPath: '/dist/',
	},
	module: {
		loaders: [
			{
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
			{
				test: /\.json$/,
				loader: 'json',
			}
		]
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
	externals: {
		'cheerio': 'window',
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true
	}
}

/* Plugins */

var
	hotReloading = (prodEnv || testEnv) ? [] : [new webpack.HotModuleReplacementPlugin()],
	fetchDefinition = [testEnv ?
		new webpack.ProvidePlugin({'fetch': 'node-fetch'}) :
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		})],
	noError = [new webpack.NoErrorsPlugin()]

config.plugins =
	hotReloading
		.concat(fetchDefinition)
		.concat(noError)

module.exports = config
