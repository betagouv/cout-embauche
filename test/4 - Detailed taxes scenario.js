description: 'Detailed taxes should be available',

steps: [
	{
		'TaxesComponent.root': function isClosed(details) {	// should be simply `false`; workaround for https://code.google.com/p/chromedriver/issues/detail?id=1062 is fixed
			return details.getAttribute('open')
						  .then(function(value) {
						  	assert(! value, 'Details should be closed by default');
						  });
		}
	},
	TaxesComponent.toggle(),
	{
		'TaxesComponent.taxesList': true,
		'TaxesComponent.randomTax': numbers,
	},
]
