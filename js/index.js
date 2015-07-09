var UI = require('./ui.js'),
	OpenFisca = require('./openfisca.js'),
	Tests = require('./tests.js');


/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange);

	var update = OpenFisca.update.bind(form);

	form.addEventListener('change', update);
	form.addEventListener('keyup', update);

	update();
}


bindToForm(document.querySelector('#input form'));

document.getElementById('createTest').addEventListener('click', Tests.create);
