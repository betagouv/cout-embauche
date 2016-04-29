import transForms from './transForms.js'

const getForm = () => document.querySelector('.SGMAPembauche form')

function getOutputVariables() {
	const baseUrl = getForm().action,
		// some of the output variables are chosen dynamically
		sourcesToAdd =
			[ ...document.querySelectorAll('[data-add-source-to-action]') ]
				.map(element => element.getAttribute('data-source'))
				.join('+')

	return `${baseUrl}+${sourcesToAdd}`
}

function collectInput(form) {
	const input = collectFormFields(form)

	Object.assign(input, addBooleanParameters())

	// Additional parameters
	const today = new Date(),
		mm = ('0' + (today.getMonth() + 1)).slice(-2)

	input['contrat_de_travail_debut'] = today.getFullYear() + '-' + mm

	return input
}

// Collect form fields that will be the base for the API input
const collectFormFields = (form) =>
		[ ...form.elements ].reduce(
			(memo, element) => {
				if (! element.name)
					return memo

				/* 	Some of the form values must be transformed
						before being sent through the request */
				const value = transForms.reduce(
					(value, transformer) => {
						const [ test, transformed ] = transformer(element, value)
						return test ? transformed : value
					},
					element.value
				)
				if (value != null)
					memo[element.name] = value
				return memo
			}, {})


const BOOLEAN_PARAMETERS = {
	employee: [ 'stagiaire', 'apprenti' ],
}


const addBooleanParameters = () =>
	Object.keys(BOOLEAN_PARAMETERS).reduce((memo, provider) => {
		const key = document.querySelector('[data-provides="' + provider + '"]').value
		if (BOOLEAN_PARAMETERS[provider].indexOf(key) > -1)
			memo[key] = true
		return memo
	}, {})


function display(data) {
	Object.keys(data).forEach(function(toSet) {
		const target = document.querySelector('[data-source="' + toSet + '"]')
		let value  = data[toSet]

		if (! target)
			return

		/* Only display the second result text, "cout du travail",
		if it is different from "salaire super brut" */
		if (toSet == 'cout_du_travail') {
			const container = document.querySelector('#cout_du_travail_container')
			if (data['salaire_super_brut'] == value)
				container.setAttribute('hidden', true)
			else container.removeAttribute('hidden')
		}

		if (typeof value == 'number') {
			value = value
				.toFixed(target.hasAttribute('data-round') ? 0 : 2)
				.replace('.', ',')
		}

		target.textContent = value
	})

	setErrorVisible(false)
}

function displayCommunesFetchResults(info, values) {
	// Inform the user
	const label = document.querySelector('label[for="depcom_entreprise"]')
	label.textContent = info || ''

	// Clear the <select>
	const depcomElement = document.querySelector('#depcom_entreprise')
	depcomElement.innerHTML = ''

	// Update the commune <select> options
	if (!values) return depcomElement.setAttribute('hidden', '')

	values.forEach(function(value) {
		const optionElement = document.createElement('option')
		optionElement.value = value.codeInsee
		optionElement.textContent = value.nomCommune
		depcomElement.appendChild(optionElement)
	})
	depcomElement.removeAttribute('hidden')
}


function showError(data) {
	data.userAgent = window.navigator.userAgent

	display(data)
	setErrorVisible(true)
}

function setErrorVisible(shouldBeVisible) {
	const element = document.getElementById('error')
	if (! shouldBeVisible)
		element.setAttribute('hidden', true)
	else element.removeAttribute('hidden')
}

function reflectParameterChange(event) {
	if (event.target.attributes['data-sets']) {
		const modifier = event.target.attributes['data-sets'].value.split('@');	// example: '#salaire@name'; first part is selector, second is attribute to set

		[ ...document.querySelectorAll(modifier[0]) ]
			.forEach(elementToUpdate => elementToUpdate[modifier[1]] = event.target.value)

	} else {
		const data = {},
			name = event.target.name || event.target.attributes['data-provides'].value

		data[name] = event.target.value

		display(data)
	}
}

function handleResultActions() {
	const
		advancedViewButton = document.querySelector('button.show-advanced'),
		taxDetailsButton = document.querySelector('button.show-details'),
		resultButtons = [ advancedViewButton, taxDetailsButton ],
		bringInputButton = document.querySelector('.bring-input-back'),
		inputSection = document.querySelector('.input'),
		taxDetailsSection = document.querySelector('section.taxes')

	advancedViewButton.addEventListener('click', () => {
		if (advancedViewButton.disabled) return
		advancedViewButton.disabled = true
		taxDetailsButton.disabled = false

		inputSection.setAttribute('hidden', true)
		bringInputButton.disabled = false

		taxDetailsSection.setAttribute('hidden', true)

		//TODO display advanced view
	})

	taxDetailsButton.addEventListener('click', () => {
		if (taxDetailsButton.disabled) return
		taxDetailsButton.disabled = true
		advancedViewButton.disabled = false

		inputSection.setAttribute('hidden', true)
		bringInputButton.disabled = false

		taxDetailsSection.removeAttribute('hidden')
		//TODO remove advanced view

	})

	bringInputButton.addEventListener('click', () => {
		inputSection.removeAttribute('hidden')
		bringInputButton.disabled = true
		resultButtons.forEach((b) => b.disabled = false)
		taxDetailsSection.setAttribute('hidden', true)
	})
}

export default {
	display,
	showError,
	reflectParameterChange,
	displayCommunesFetchResults,
	getForm,
	collectInput,
	getOutputVariables,
	handleResultActions,
}
