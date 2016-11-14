if (process.env.NODE_ENV === 'production') // eslint-disable-line no-undef
	module.exports = require('./App.prod')
else
	module.exports = require('./App.dev')
