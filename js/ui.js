module.exports = {
	display: display,
	showError: showError,
	reflectParameterChange: reflectParameterChange,
}


function display(data) {
	Object.keys(data).forEach(function(toSet) {
		var target = document.querySelector('[data-source="' + toSet + '"]'),
			value  = data[toSet]

		if (! target)
			return

		if (typeof value == 'number')
			value = String(value.toFixed(2)).replace('.', ',')

		target.textContent = value
	})

	var salaireBrut = +document.querySelector('#salaire').value
	var res = {
		employeur: salaireBrut,
		salarie: salaireBrut,
	};

	[].forEach.call(document.querySelectorAll('.category'), function(cat){

		if (cat.innerHTML.indexOf('Cotisations employeur') > -1){
			[].forEach.call(cat.querySelectorAll('.value span'), function(el){
				res.employeur += - el.innerHTML.replace(',', '.')
			})

		}
		if (cat.innerHTML.indexOf('Cotisations salarié')  > -1){
			[].forEach.call(cat.querySelectorAll('.value span'), function(el){
				res.salarie += + el.innerHTML.replace(',', '.')
			})
		}

		if (cat.innerHTML.indexOf('Exonérations employeur')  > -1){
			[].forEach.call(cat.querySelectorAll('.value span'), function(el){
				res.employeur += - el.innerHTML.replace(',', '.')
			})
		}

	})
	console.log(res)
	console.log('superbrut reçu', document.querySelector('[data-source="salsuperbrut"]').innerHTML,
	'net reçu', document.querySelector('[data-source="salaire_net_a_payer"]').innerHTML)

	setErrorVisible(false)
}

function showError(data) {
	data.userAgent = window.navigator.userAgent

	display(data)
	setErrorVisible(true)
}

function setErrorVisible(shouldBeVisible) {
	document.getElementById('error').hidden = ! shouldBeVisible
}

function reflectParameterChange(event) {
	if (event.target.attributes['data-sets']) {
		var modifier = event.target.attributes['data-sets'].value.split('@')	// example: '#salaire@name'; first part is selector, second is attribute to set

		Array.prototype.forEach.call(document.querySelectorAll(modifier[0]), function(elementToUpdate) {
			elementToUpdate[modifier[1]] = event.target.value
		})
	} else {
		var data = {},
			name = event.target.name || event.target.attributes['data-provides'].value

		data[name] = event.target.value

		display(data)
	}
}
