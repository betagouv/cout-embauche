description: 'An acceptance test should be creatable from the results',

scenario: [
	TaxesWidget.createTest(),
	{
		'LudwigWidget.navbar': true,
	},
]
