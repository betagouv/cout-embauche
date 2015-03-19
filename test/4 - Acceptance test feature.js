description: 'An acceptance test should be creatable from the results',

scenario: [
	DetailsWidget.createTest(),
	{
		'LudwigWidget.navbar': true,
	},
]
