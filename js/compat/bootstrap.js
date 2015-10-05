var MAPPING = {
	'.SGMAPembauche form > div': 'form-inline',
	'.SGMAPembauche input, .SGMAPembauche select': 'form-control'
};


for (selector in MAPPING) {
	if (! MAPPING.hasOwnProperty(selector))
		continue;

	Array.prototype.forEach.call(document.querySelectorAll(selector), function(element) {
		element.classList.add(MAPPING[selector]);
	});
}
