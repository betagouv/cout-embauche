var OpenFisca = require('./openfisca')


module.exports = {
	create: createTest
}


var ACCEPTANCE_TESTS_ENDPOINT = 'http://embauche.sgmap.fr/tests/api/public/acceptance-tests',
	ACCEPTANCE_TESTS_GUI_URL = 'http://embauche.sgmap.fr/tests/'

function createTest() {
	var lastResults = OpenFisca.getLastResults()

	var formattedResults = Object.keys(lastResults).map(function(key) {
		return {
			code: key,
			expectedValue: lastResults[key]
		}
	})

	var data = {
		expectedResults: formattedResults,
		scenario: OpenFisca.buildURL()
	}

	var request = new XMLHttpRequest()

	request.open('POST', ACCEPTANCE_TESTS_ENDPOINT)

	request.onload = function() {
		if (request.status >= 300)
			throw request

		var data = JSON.parse(request.responseText)

		document.location = [ ACCEPTANCE_TESTS_GUI_URL, data._id, 'edit' ].join('/')
	}

	request.onerror = function() {
		throw request
	}

	request.setRequestHeader('Content-Type', 'application/json')
	request.send(JSON.stringify(data))
}
