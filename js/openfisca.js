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

		/* In the case of a `temps partiel`, we are asking hours per week,
		the most common way to reason about it. But OpenFisca needs hours per month */
		if (element.name == 'heures_remunerees_volume') {
			var dureeLegaleMensuelle = 151.66,
				dureeLegaleHebdomadaire = 35
			value = value * (dureeLegaleMensuelle / dureeLegaleHebdomadaire)
		}

		result.push(encodeURI(element.name + '=' + value))
	})

	return result.join('&')
}

function getAdditionalParameters() {
	var result = {};

	[].forEach.call(document.querySelectorAll('[data-boolean]'), function(element) {
		var key = element.options[element.selectedIndex].dataset.booleanKey
		if (key)
			result[key] = true
	})

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
	var today = new Date(),
		mm = ('0' + (today.getMonth() + 1)).slice(-2)

	get({
		contrat_de_travail_debut: today.getFullYear() + '-' + mm,
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
