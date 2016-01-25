var UI = require('./ui')


var buffer

module.exports = {
	buildURL: buildOpenFiscaQueryURL,
	get: get,
	update: update,
	getLastResults: function() { return buffer },
}


function serialize(form) {
	var result = [],
		elements = form.elements

	Array.prototype.forEach.call(elements, function(element) {
		if (! element.name)
			return

		var value = element.value

		if (element.type == 'number')
			value = Number(element.value.replace(',', '.'))	// IE doesn't support locale number formats

		/* We are simulating a recruitment,
		hence requesting salaries with the new size of the entreprise */
		if (element.name == 'effectif_entreprise')
			value ++

		result.push(encodeURI(element.name + '=' + value))
	})

	return result.join('&')
}


var BOOLEAN_PARAMETERS = {
	employee: [ 'stagiaire', 'apprenti' ],
}

function getAdditionalParameters() {
	var result = {}

	for (var provider in BOOLEAN_PARAMETERS) {
		var key = document.querySelector('[data-provides="' + provider + '"]').value

		if (BOOLEAN_PARAMETERS[provider].indexOf(key) > -1)
			result[key] = true
	}

	return result
}

/** Serializes a shallow object into a series of query string parameters.
* A naive and shallow implementation.
*
*@param		{Object}	source
*@returns	{String}	The source object as a query string (with no leading '?').
*@private
*/
function serializeObject(source) {
	var result = []

	for (var key in source) {
		if (key && source.hasOwnProperty(key))
			result.push(encodeURI(key + '=' + source[key]))
	}

	return result.join('&')
}

/** Creates an OpenFisca URL to the /formula endpoint, based on the current main form state and the given additional parameters.
*
*@param		{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@returns	{String}	The URL for the OpenFisca query.
*/
function buildOpenFiscaQueryURL(additionalParameters) {
	var form = document.querySelector('#input form'),
		queryStringBlocks = [
			serialize(form),
			serializeObject(getAdditionalParameters()),
			serializeObject(additionalParameters),
		].filter(function(element) {
			return element !== ''}
		)

	return form.action + '?' + queryStringBlocks.join('&')
}

/** Computes values based on the current main form state and the given additional parameters.
*
*@param	{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
function get(additionalParameters, callback) {
	if (! callback) {
		callback = additionalParameters
		additionalParameters = null
	}

	var request = new XMLHttpRequest()

	request.onload = function openFiscaOnloadHandler() {
		try {
			var data = JSON.parse(request.responseText)
		} catch (err) {
			callback(err)
		}

		callback(request.status != 200 && request, data.values, data)
	}

	request.onerror = callback.bind(null, request)

	request.open('GET', buildOpenFiscaQueryURL(additionalParameters))
	request.send()
}

/** Updates the displayed values.
*/
function update() {
	var today = new Date()

	get({
		contrat_de_travail_debut: today.getFullYear() + '-' + (today.getMonth() + 1),
	}, function(error, values, response) {
		if (error) {
			if (response && response.error)
				return UI.showError(response.error)

			UI.showError({ message: error })
			throw error
		}

		buffer = values
		UI.display(values)
	})
}
