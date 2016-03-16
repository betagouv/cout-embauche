import UI from './ui.js'
import OpenFisca from './openfisca.js'
import debounce from '../lib/debounce.js'

//Store the last computation
var buffer = null

/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange)

	const handleBasicFormChanges = debounce(openFiscaRequestBuilder(form), 300)

	handleBasicFormChanges()

	const handleFormChanges = event => {
		switch (event.target.name) {
		case 'code_postal_entreprise':
			handleCodePostalInput(event.target.value, handleBasicFormChanges)
			break
		case 'contrat_de_travail':
			handleTempsPartielSelect(event.target.value, handleBasicFormChanges)
			break
		default: handleBasicFormChanges()
		}
	}

	form.addEventListener('change', handleFormChanges)
	form.addEventListener('keyup', handleFormChanges)
}

const openFiscaRequestBuilder = (form) => () => {
	// Base url containing the list of desired output variables
	var baseUrl = UI.getOutputVariables()

	OpenFisca.request(UI.collectInput(form), baseUrl, handleAPIResponse)
}

function handleAPIResponse(error, values, response) {
	if (error) {
		if (response && response.error)
			return UI.showError(response.error)

		UI.showError({ message: error })
		throw error
	}

	buffer = values
	UI.display(values)
}

/*
code_postal_entreprise <input> value is used to dynamically
fetch a list of options for the the depcom_entreprise <select> element
*/
function handleCodePostalInput(codePostal, next) {

	if (codePostal.length !== 5)
		return UI.displayCommunesFetchResults()

	fetch(`https://apicarto.sgmap.fr/codes-postaux/communes/${codePostal}`)
		.then(response => {
			if (!response.ok) {
				const error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response.json()
		})
		.then(json => {
			if (json.length === 0)
				UI.displayCommunesFetchResults('Aucune commune correspondante trouvée')
			else
				UI.displayCommunesFetchResults('', json)
		})
		.catch(error => {
			UI.displayCommunesFetchResults('Le code postal n\'a pas pu être pris en compte')
			console.error(error)
		})
		.then(next)
}

/*
contrat_de_travail <select> value can trigger the display
of the heures_remunerees_volume <input> field.
*/
function handleTempsPartielSelect(contrat, next) {
	const container = document.querySelector('#temps_partiel_container')
	if (contrat === 'temps_plein')
		container.setAttribute('hidden', true)
	else container.removeAttribute('hidden')

	next()
}

bindToForm(UI.getForm());

[ ...document.querySelectorAll('.SGMAPembauche .js-only') ]
	.forEach(jsNode => jsNode.className = jsNode.className.replace('js-only', ''))

export default {
	OpenFisca: {
		buildURL: OpenFisca.buildOpenFiscaQueryURL,
		get: OpenFisca.get,
		getLastResults: () => buffer, // API function
	},
}
