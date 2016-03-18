const MAPPING = {
	'.SGMAPembauche form > div': 'form-inline',
	'.SGMAPembauche input, .SGMAPembauche select': 'form-control',
}

Object.keys(MAPPING).forEach(selector => {
	[ ...document.querySelectorAll(selector) ]
		.forEach(element => element.classList.add(MAPPING[selector]))
})
