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
	form.addEventListener('keyup', update)
}


bindToForm(document.querySelector('.SGMAPembauche form'))

var jsNodes = document.querySelectorAll('.SGMAPembauche .js-only')

for (var i = 0; i < jsNodes.length; i++)
	jsNodes[i].className = jsNodes[i].className.replace('js-only', '')

document.getElementById('createTest').addEventListener('click', Tests.create)

module.exports.OpenFisca = OpenFisca
