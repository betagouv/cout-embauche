numbers = /^-?[0-9]+(,[0-9]{2})?$/

function greaterThan(value) {
	return function hasTextGreaterThan(element) {
		return element.text()
					  .then(function(text) {
					  	assert(parseFloat(text) > value,
					  		   text + ' should be greater than ' + parseFloat(value));
					  });
	}
}
