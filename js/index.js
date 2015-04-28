window.Embauche = window.Embauche || {};

/** Handle events from the given form to update data.
*/
window.Embauche.bind = function bindToForm(form) {
	form.addEventListener('change', window.Embauche.UI.reflectParameterChange);

	var update = window.Embauche.OpenFisca.update.bind(form);

	form.addEventListener('change', update);
	form.addEventListener('keyup', update);

	update();
}
