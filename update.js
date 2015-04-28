function serialize(form) {
	var result = [],
		elements = form.elements;

	Array.prototype.forEach.call(elements, function(element) {
		if (element.name)
			result.push(encodeURI(element.name + '=' + element.value));
	});

	return result.join('&');
}

function getAdditionalParameters() {
	var result = {},
		employeeType = document.querySelector('[data-provides="employee"]').value;

	result[employeeType] = true;

	return result;
}

function serializeObject(source) {
	var result = [];

	for (key in source)
		if (key && source.hasOwnProperty(key))
			result.push(encodeURI(key + '=' + source[key]));

	return result.join('&');
}

function update() {
	var request = new XMLHttpRequest();

	request.open(this.method, this.action + '?' + serialize(this) + '&' + serializeObject(getAdditionalParameters()));

	request.onload = function() {
		if (request.status != 200)
			throw request;

		var data = JSON.parse(request.responseText);

		window.lastResult = data.values;

		display(data.values);
	};

	request.onerror = function() {
		throw request;
	}

	request.send();
}
