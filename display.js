function display(data) {
	Object.keys(data).forEach(function(toSet) {
		var target = document.querySelector('#result [data-source="' + toSet + '"]');

		if (! target)
			return;

		target.innerText = data[toSet];
	});
}

function reflectParameterChange(event) {
	var data = {};
	data[event.target.name || event.target.attributes['data-provides'].value] = event.target.value;

	display(data);
}
