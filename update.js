function serialize(form) {
	var result = [],
		elements = form.elements;

	Array.prototype.forEach.call(elements, function(element) {
		if (element.name)
			result.push(encodeURI(element.name + '=' + element.value));
	});

	return result.join('&');
}

function update() {
	var request = new XMLHttpRequest();

	request.open(this.method, this.action + '?' + serialize(this));

	request.onload = function() {
		if (request.status != 200)
			throw request;

		var data = JSON.parse(request.responseText);
		display(data);
	};

	request.onerror = function() {
		throw request;
	}

	request.send();
}

function display(data) {
	console.log('>> data:', data);
}
