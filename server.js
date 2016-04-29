var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
//var compression = require('compression')

var app = new (require('express'))()
//app.use(compression())

var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { publicPath: '/dist/', stats: { colors: true }, noInfo: false }))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
	res.sendFile(require('path').resolve('./index.html'))
})

app.listen(port, function(error) {
	if (error)
		console.error(error)
	else
		console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)

})
