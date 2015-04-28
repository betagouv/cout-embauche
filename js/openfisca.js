(function() {

window.Embauche.OpenFisca = {
	buildURL: buildOpenFiscaQueryURL,
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

function update() {
	var request = new XMLHttpRequest();

	request.open(this.method, buildOpenFiscaQueryURL());

	request.onload = function() {
		if (request.status != 200)
			throw request;

		var data = JSON.parse(request.responseText);

		window.lastResult = data.values;

		window.Embauche.UI.display(data.values);
	};

	request.onerror = function() {
		throw request;
	}

	request.send();
}

})();
