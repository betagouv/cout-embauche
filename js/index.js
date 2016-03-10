var UI = require('./ui.js'),
	OpenFisca = require('./openfisca.js'),
	debounce = require('../lib/debounce.js')


/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange)

	var handleBasicFormChanges = debounce(OpenFisca.update.bind(form), 300)

	handleBasicFormChanges()

	var handleFormChanges = function(event) {
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

/*
code_postal_entreprise <input> value is used to dynamically
fetch a list of options for the the depcom_entreprise <select> element
*/
function handleCodePostalInput(codePostal, next) {

	if (codePostal.length !== 5)
		return UI.displayCommunesFetchResults()

	var request = new XMLHttpRequest()
	request.onload = function() {
		try {
			if (request.status !== 200)	throw new Error(request.responseText)

			var data = JSON.parse(request.responseText)
			if (data.length === 0) {
				UI.displayCommunesFetchResults('Aucune commune correspondante trouvée')
				return
			}
			UI.displayCommunesFetchResults('', data)
		} catch (err) {
			UI.displayCommunesFetchResults('Le code postal n\'a pas pu être pris en compte')
			console.error(err)
		} finally {
			next()
		}
	}

	request.onerror = function() {
		UI.displayCommunesFetchResults('Le code postal n\'a pas pu être pris en compte (réseau faible ?)')
		next()
	}

	request.open('GET', 'https://apicarto.sgmap.fr/codes-postaux/communes/' + codePostal)
	request.send()
}

/*
contrat_de_travail <select> value can trigger the display
of the heures_remunerees_volume <input> field.
*/
function handleTempsPartielSelect(contrat, next) {
	var container = document.querySelector('#temps_partiel_container')
	if (contrat === 'temps_plein')
		container.setAttribute('hidden', true)
	else container.removeAttribute('hidden')

	next()
}

bindToForm(document.querySelector('.SGMAPembauche form'))

var jsNodes = document.querySelectorAll('.SGMAPembauche .js-only')

for (var i = 0; i < jsNodes.length; i++)
	jsNodes[i].className = jsNodes[i].className.replace('js-only', '')

module.exports.OpenFisca = OpenFisca
