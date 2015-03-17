var ACCEPTANCE_TESTS_ENDPOINT = 'http://paie.sgmap.fr/tests/api/acceptance-tests',
	ACCEPTANCE_TESTS_GUI_URL = 'http://paie.sgmap.fr/tests/';

function createTest() {
	var formattedResults = Object.keys(window.lastResult).map(function(key) {
		return {
			code: key,
			expectedValue: window.lastResult[key]
		}
	});

	var form = document.getElementsByTagName('form')[0];

	var data = {
		expectedResults: formattedResults,
		scenario: form.action + '?' + serialize(form)
	}

	var request = new XMLHttpRequest();

	request.withCredentials = true;

	request.open('POST', ACCEPTANCE_TESTS_ENDPOINT);

	request.onload = function() {
		if (request.status >= 300)
			throw request;

		var data = JSON.parse(request.responseText);

		document.location = [ ACCEPTANCE_TESTS_GUI_URL, data._id, 'edit' ].join('/');
	};

	request.onerror = function() {
		throw request;
	}

	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify(data));
}
