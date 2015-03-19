description: 'Detailed taxes should be available',

scenario: [
	{
		'DetailsWidget.root': function isClosed(details) {	// should be simply `false`; workaround for https://code.google.com/p/chromedriver/issues/detail?id=1062 is fixed
			return details.getAttribute('open')
						  .then(function(value) {
						  	assert(! value, 'Details should be closed by default');
						  });
		}
	},
	DetailsWidget.toggle(),
	{
		'DetailsWidget.taxesList': true,
		'DetailsWidget.randomTax': numbers,
	},
]
