import UI from './ui'

/** Serializes a shallow object into a series of query string parameters.
* A naive and shallow implementation.
*
*@param		{Object}	source
*@returns	{String}	The source object as a query string (with no leading '?').
*@private
*/
const serializeObject = source =>
	Object.keys(source)
		.map(key => encodeURI(key + '=' + source[key]))
		.join('&')


/** Helper to call the OpenFisca Web API's /formula endpoint
*
*@param	{Object}	[input]	An object whose properties will be appended to the URL as query-string parameters representing OpenFisca input variable ids and their values.
*@param	{String}	[baseUrl]	Url pointing to an instance of the OpenFisca Web API and containing the desired output variables
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
function request(input, baseUrl, callback) {

	const url = baseUrl + '?' + serializeObject(input)

	if (!callback)
		return url

	fetch(url)
		.then( response => {
			if (!response.ok) {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response.json()
		})
		.then( json => callback(false, json.values, json))
		.catch( error => {
			callback(error)
		})
}

/** API function

Computes values based on the current main form state and the given additional parameters.
*
*@param	{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
function get(additionalParameters, callback) {
	// Base url containing the list of desired output variables
	var baseUrl = UI.getOutputVariables()
	var input = UI.collectInput()

	Object.assign(input, additionalParameters) // merge parameters

	return request(input, baseUrl, callback)
}


/** API backward compatibility function

Creates an OpenFisca URL to the /formula endpoint, based on the current main form state and the given additional parameters.
*
*@param		{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@returns	{String}	The URL for the OpenFisca query.
*/
const buildOpenFiscaQueryURL = (additionalParameters) => get(additionalParameters)

export default {
	buildURL: buildOpenFiscaQueryURL,
	get: get,
	request: request,
}
