function display(data) {
	Object.keys(data).forEach(function(toSet) {
		var target = document.querySelector('#result [data-source="' + toSet + '"]');

		if (! target)
			return;

		target.innerText = data[toSet];
	});
}
