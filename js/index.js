var UI = require('./ui.js'),
	OpenFisca = require('./openfisca.js'),
	debounce = require('../lib/debounce.js'),
	Tests = require('./tests.js')


/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange)

	var update = debounce(OpenFisca.update.bind(form), 300)

	update()

	form.addEventListener('change', update)
	form.addEventListener('keyup', function(e) {
		handleDynamicForms(e, update)
	})
}

function handleDynamicForms(e, next) {

	function displayCommuneError(text) {
		//TODO
	}
	/*
	code_postal_entreprise <input> value is used to dynamically
	fetch a list of options for the the depcom_entreprise <select> element
	*/
	if (e.target.name && e.target.name === 'code_postal_entreprise') {
		var codePostal = e.target.value
		var depcomElement = document.querySelector('#depcom_entreprise')

		if (codePostal.length !== 5) {
			depcomElement.innerHTML = ''
			depcomElement.setAttribute('hidden', '')
			return
		}
		var request = new XMLHttpRequest()
		request.onload = function() {
			try {
				var data = JSON.parse(request.responseText)
				if (data.length === 0) {
					displayCommuneError('Aucune commune ne correspond à ce code postal')
					return
				}
				depcomElement.removeAttribute('hidden', false)
				depcomElement.innerHTML = ''
				data.forEach(function(datum) {
					var opt = document.createElement('option')
					opt.value = datum.codeInsee
					opt.innerHTML = datum.nomCommune
					depcomElement.appendChild(opt)
				})
				next()
			} catch (err) {
				displayCommuneError('Le code postal n\'a pas pu être pris en compte')
			}
		}

		request.onerror = function() {
			displayCommuneError('Le code postal n\'a pas pu être pris en compte')
		}

		request.open('GET', 'http://code-postaux.sgmap.fr/' + codePostal)
		request.send()
	} else next()
}

bindToForm(document.querySelector('.SGMAPembauche form'))

var jsNodes = document.querySelectorAll('.SGMAPembauche .js-only')

for (var i = 0; i < jsNodes.length; i++)
	jsNodes[i].className = jsNodes[i].className.replace('js-only', '')

document.getElementById('createTest').addEventListener('click', Tests.create)

module.exports.OpenFisca = OpenFisca
