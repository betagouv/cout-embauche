function serialize(form) {
	var result = [],
		elements = form.elements;

	Array.prototype.forEach.call(elements, function(element) {
		if (element.name)
			result.push(encodeURI(element.name + '=' + element.value));
	});

	return result.join('&');
}

function update(urlBuilder, callback) {
	var request = new XMLHttpRequest();

	request.open(this.method, urlBuilder.call(this));

	request.onload = function() {
		if (request.status != 200)
			throw request;

		var data = JSON.parse(request.responseText);

		window.lastResult = data.values;

		callback(data.values);
	};

	request.onerror = function() {
		throw request;
	}

	request.send();
}
