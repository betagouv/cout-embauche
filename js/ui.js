(function() {

window.Embauche.UI = {
	display: display,
	reflectParameterChange: reflectParameterChange
}

function display(data) {
	Object.keys(data).forEach(function(toSet) {
		var target = document.querySelector('[data-source="' + toSet + '"]'),
			value  = data[toSet];

		if (! target)
			return;

		if (typeof value == 'number')
			value = String(value.toFixed(2)).replace('.', ',')

		target.textContent = value;
	});
}

function reflectParameterChange(event) {
	if (event.target.attributes['data-sets']) {
		var modifier = event.target.attributes['data-sets'].value.split('@');	// example: '#salaire@name'; first part is selector, second is attribute to set

		Array.prototype.forEach.call(document.querySelectorAll(modifier[0]), function(elementToUpdate) {
			elementToUpdate[modifier[1]] = event.target.value;
		});
	} else {
		var data = {};
		data[event.target.name || event.target.attributes['data-provides'].value] = event.target.value;

		display(data);
	}
}

})();
