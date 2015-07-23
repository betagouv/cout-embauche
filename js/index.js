var UI = require('./ui.js'),
	OpenFisca = require('./openfisca.js'),
	debounce = require('../lib/debounce.js'),
	Tests = require('./tests.js');


/** Handle events from the given form to update data.
*/
function bindToForm(form) {
	form.addEventListener('change', UI.reflectParameterChange);

	var update = OpenFisca.update.bind(form);

	update();

	update = debounce(update, 300);

	form.addEventListener('change', update);
	form.addEventListener('keyup', update);
}


bindToForm(document.querySelector('.embauche form'));

var jsNodes = document.querySelectorAll('.embauche .js-only');

for (var i = 0; i < jsNodes.length; i++) {
	jsNodes[i].className = jsNodes[i].className.replace('js-only', '');
}

document.getElementById('createTest').addEventListener('click', Tests.create);

module.exports.OpenFisca = OpenFisca;
