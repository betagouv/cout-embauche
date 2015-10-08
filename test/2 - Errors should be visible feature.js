description: 'Input errors should be visible',

scenario: [
	InputsWidget.setSalaryField(''),
	{
		'ErrorWidget.title': true,
	}
]
