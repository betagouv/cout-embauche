var MAPPING = {
	'.embauche form > div': 'form-inline',
	'.embauche input, .embauche select': 'form-control'
};


for (selector in MAPPING) {
	if (! MAPPING.hasOwnProperty(selector))
		continue;

	Array.prototype.forEach.call(document.querySelectorAll(selector), function(element) {
		element.className += ' ' + MAPPING[selector];
	});
}
