description: 'Detailed taxes should be available',

scenario: [
	{
		'DetailsWidget.taxesList': false,
	},
	DetailsWidget.toggle(),
	{
		'DetailsWidget.taxesList': true,
		'DetailsWidget.randomTax': numbers,
	},
]
