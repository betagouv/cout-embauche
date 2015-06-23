(function() {

window.Embauche.OpenFisca = {
	buildURL: buildOpenFiscaQueryURL,
	get: get,
	update: update
}


function serialize(form) {
	var result = [],
		elements = form.elements;

	Array.prototype.forEach.call(elements, function(element) {
		if (element.name)
			result.push(encodeURI(element.name + '=' + element.value));
	});

	return result.join('&');
}

function getAdditionalParameters() {
	var result = {},
		employeeType = document.querySelector('[data-provides="employee"]').value;

	result[employeeType] = true;

	return result;
}

/** Serializes a shallow object into a series of query string parameters.
* A naive and shallow implementation.
*
*@param		{Object}	source
*@returns	{String}	The source object as a query string (with no leading '?').
*@private
*/
function serializeObject(source) {
	var result = [];

	for (key in source)
		if (key && source.hasOwnProperty(key))
			result.push(encodeURI(key + '=' + source[key]));

	return result.join('&');
}

/** Creates an OpenFisca URL to the /formula endpoint, based on the current main form state and the given additional parameters.
*
*@param		{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@returns	{String}	The URL for the OpenFisca query.
*/
function buildOpenFiscaQueryURL(additionalParameters) {
	var form = document.querySelector('#input form'),
		queryStringBlocks = [ serialize(form), serializeObject(getAdditionalParameters()), serializeObject(additionalParameters) ];

	return form.action + '?' + queryStringBlocks.join('&');
}

/** Computes values based on the current main form state and the given additional parameters.
*
*@param	{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
function get(additionalParameters, callback) {
	if (! callback) {
		callback = additionalParameters;
		additionalParameters = null;
	}

	var request = new XMLHttpRequest();

	request.onload = function openFiscaOnloadHandler() {
		if (request.status != 200)
			return callback(request);

		try {
			var data = JSON.parse(request.responseText);
		} catch (err) {
			callback(err);
		}

		callback(null, data.values, data);
	};

	request.onerror = callback.bind(null, request);

	request.open('GET', buildOpenFiscaQueryURL(additionalParameters));
	request.send();
}

/** Updates the form.
*/
function update() {
	get(function(error, values) {
		if (error) throw error;

		window.Embauche._lastResults = values;
		window.Embauche.UI.display(values);
	});
}

})();
