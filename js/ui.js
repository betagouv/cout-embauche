export default {
	display: display,
	showError: showError,
	reflectParameterChange: reflectParameterChange,
	displayCommunesFetchResults: displayCommunesFetchResults,
}


function display(data) {
	Object.keys(data).forEach(function(toSet) {
		var target = document.querySelector('[data-source="' + toSet + '"]'),
			value  = data[toSet]

		if (! target)
			return

		/* Only display the second result text, "cout du travail",
		if it is different from "salaire super brut" */
		if (toSet == 'cout_du_travail') {
			var container = document.querySelector('#cout_du_travail_container')
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
	var label = document.querySelector('label[for="depcom_entreprise"]')
	label.textContent = info || ''

	// Clear the <select>
	var depcomElement = document.querySelector('#depcom_entreprise')
	depcomElement.innerHTML = ''

	// Update the commune <select> options
	if (!values) return depcomElement.setAttribute('hidden', '')

	values.forEach(function(value) {
		var optionElement = document.createElement('option')
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
	var element = document.getElementById('error')
	if (! shouldBeVisible)
		element.setAttribute('hidden', true)
	else element.removeAttribute('hidden')
}

function reflectParameterChange(event) {
	if (event.target.attributes['data-sets']) {
		var modifier = event.target.attributes['data-sets'].value.split('@')	// example: '#salaire@name'; first part is selector, second is attribute to set

		Array.prototype.forEach.call(document.querySelectorAll(modifier[0]), function(elementToUpdate) {
			elementToUpdate[modifier[1]] = event.target.value
		})
	} else {
		var data = {},
			name = event.target.name || event.target.attributes['data-provides'].value

		data[name] = event.target.value

		display(data)
	}
}
