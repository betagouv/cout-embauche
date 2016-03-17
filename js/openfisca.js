import UI from './ui'

var buffer

export default {
	buildURL: buildOpenFiscaQueryURL,
	get,
	update,
	getLastResults: () => buffer,
}


const serialize = form =>
	[ ...form.elements ]
		.map(element => {
			if (! element.name)
				return null

			let value = element.value

			if (element.type == 'number')
				value = Number(element.value.replace(',', '.'))	// IE doesn't support locale number formats

			/* We are simulating a recruitment,
			hence requesting salaries with the new size of the entreprise */
			if (element.name == 'effectif_entreprise')
				value ++

			/* In the case of a `temps partiel`, we are asking hours per week,
			the most common way to reason about it. But OpenFisca needs hours per month */
			if (element.name == 'heures_remunerees_volume') {
				const dureeLegaleMensuelle = 151.66,
					dureeLegaleHebdomadaire = 35
				value = value * (dureeLegaleMensuelle / dureeLegaleHebdomadaire)
			}

			return encodeURI(element.name + '=' + value)
		})
		.filter(value => value != null)
		.join('&')


const BOOLEAN_PARAMETERS = {
	employee: [ 'stagiaire', 'apprenti' ],
}

const getAdditionalParameters = () =>
	Object.keys(BOOLEAN_PARAMETERS).reduce((memo, provider) => {
		const key = document.querySelector('[data-provides="' + provider + '"]').value
		if (BOOLEAN_PARAMETERS[provider].indexOf(key) > -1)
			memo[key] = true
		return memo
	}, {})

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

/** Creates an OpenFisca URL to the /formula endpoint, based on the current main form state and the given additional parameters.
*
*@param		{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@returns	{String}	The URL for the OpenFisca query.
*/
function buildOpenFiscaQueryURL(additionalParameters) {
	const form = document.querySelector('#input form'),
		queryStringBlocks = [
			serialize(form),
			serializeObject(getAdditionalParameters()),
			serializeObject(additionalParameters),
		].filter(element => element !== '')

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

	const url = buildOpenFiscaQueryURL(additionalParameters)

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

/** Updates the displayed values.
*/
function update() {
	const today = new Date(),
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
