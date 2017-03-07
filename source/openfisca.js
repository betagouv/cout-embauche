import detailsSpec from './details-spec.yaml'

export function simulationDate() {
	let
		today = new Date(),
		MM = ('0' + (today.getMonth() + 1)).slice(-2),
		simulationMM = MM == '12' ? '11' : MM // computations will fail in december. Lazy fix.

	return today.getFullYear() + '-' + simulationMM
}

// JS API
window.Embauche = {
	OpenFisca: {
		//input: will be set by sagas.js
		getLastResults: () => window.Embauche.OpenFisca.input,
		get,
	},
}


/** Serializes a shallow object into a series of query string parameters.
*
*@param		{Object}	source
*@returns	{String}	The source object as a query string (with no leading '?').
*@private
*/
let serializeObject = source =>
	Object.keys(source)
		.map(key => encodeURI(key + '=' + source[key]))
		.join('&')

let details = detailsSpec['Détails'],
	tables = Object.keys(details)

let flatten = list => list.reduce(
	(memo, l) => [
		...memo,
		... (typeof l == 'string' ?
			[l]
		: flatten(l)
		)
	]
	, []
)

let detailsOutputVariableKeys = flatten(tables.map(t => {
	let table = details[t]['catégories'],
		categories = Object.keys(table)
	return categories.map(c => {
		let category = table[c],
			items = Object.keys(category)
		return items.map(key => {
			let {employeur, salarie} = category[key]
			return (employeur ? [employeur] : []).concat( (salarie ? [salarie] : []))
		})
	})
})
)


// Url pointing to an instance of the OpenFisca Web API and containing the desired output variables
let baseUrl =
	'https://embauche.beta.gouv.fr/openfisca/api/2/formula/' + simulationDate() + '/' +
	// output variables are extracted from the YAML file used to display them in the UI
	detailsOutputVariableKeys.concat(['cout_du_travail', 'salaire_super_brut']).join('+')

/** Helper to call the OpenFisca Web API's /formula endpoint
*
*@param	{Object}	[input]	An object whose properties will be appended to the URL as query-string parameters representing OpenFisca input variable ids and their values.
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
export function request(input) {

	let
		url =
			baseUrl +
			(input['salaire_net_a_payer'] ? '+salaire_de_base' : '+salaire_net_a_payer') +
			'?' +
			serializeObject(input),
		headers = input['salaire_net_a_payer'] ? {
			'x-OpenFisca-Extensions': 'de_net_a_brut',
		} : {}

	return new Promise( (resolve, reject) =>
		fetch(url, {headers})
			.then(response => {
				if (!response.ok) {
					const error = new Error(response.statusText)
					error.response = response
					reject(error)
				}
				return response.json()
			})
			.then(json => resolve(json))
			.catch(reject)
		)
}

/** Documented API function

Computes values based on the current main form state and the given additional parameters.
*
*@param	{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
*/
function get(additionalParameters, callback) {
	let promise = request(
		Object.assign(window.Embauche.OpenFisca.input, additionalParameters),
		baseUrl
	)
	promise.then(
		json => callback(null, json.values, json),
		error => callback(error)
	)
}
