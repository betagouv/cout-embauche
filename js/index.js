import UI from './ui.js'
import OpenFisca from './openfisca.js'
import debounce from '../lib/debounce.js'

//Store the last computation
let buffer

/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange)

	const handleBasicFormChanges = debounce(openFiscaRequestBuilder(form), 500)

	// Trigger the first request
	handleBasicFormChanges()

	const handleFormChanges = event => {
		const {name, id} = event.target
		if (name === 'code_postal_entreprise')
			return handleCodePostalInput(event.target.value, handleBasicFormChanges)
		if (name === 'contrat_de_travail')
			return handleTempsPartielSelect(event.target.value, handleBasicFormChanges)
		if (id === 'select-salaire-entree')
			return handleSalaireSelect(event.target.value, handleBasicFormChanges)
		if (id === 'select-employee-type')
			return handleNoteAlternance(event.target.value, handleBasicFormChanges)
		if (id === 'select-entreprise-type')
			return handleEntrepriseTypeSelect(event.target.value, handleBasicFormChanges)
		return handleBasicFormChanges()
	}

	form.addEventListener('change', handleFormChanges)
	form.addEventListener('keyup', handleFormChanges)
}

const openFiscaRequestBuilder = (form) => () =>
	OpenFisca.request(
		UI.collectInput(form),
		UI.getOutputVariables(), // Base url containing the list of desired output variables
		handleAPIResponse
	)

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

function handleSalaireSelect(selectedSalaire, next) {
	const outputSalaireValue = document.querySelector('#salaire-calcule'),
		outputSalaireType = document.querySelector('#type-salaire-calcule'),
		correspondence = {
			'salaire_de_base': [ 'salaire_net_a_payer', 'net' ],
			'salaire_net_a_payer': [ 'salaire_de_base', 'brut' ],
		},
		[ source, type ] = correspondence[selectedSalaire]

	outputSalaireValue.setAttribute('data-source', source)
	outputSalaireType.textContent = type

	next()
}

function handleEntrepriseTypeSelect(selectedEntrepriseType, next) {
	const nodesToUpdate = document.querySelectorAll('.employer_type'),
		correspondence = {
			'entreprise': 'entreprise',
			'entreprise_est_association_non_lucrative': 'association',
		},
		updateText = n => n.textContent = correspondence[selectedEntrepriseType];

	[ ...nodesToUpdate ].forEach(updateText)

	next()
}



function handleNoteAlternance(selectedEmployeeType, next) {
	const noteAlternance = document.querySelector('#note-alternance')
	if (selectedEmployeeType === 'apprenti')
		noteAlternance.removeAttribute('hidden')
	else
		noteAlternance.setAttribute('hidden', true)

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
