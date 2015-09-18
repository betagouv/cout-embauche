description: 'Input errors should be visible',

scenario: [
	InputsWidget.setSalaryField('herp\n'),
	{
		'ErrorWidget.title': true,
	}
]
