description: 'Errors should be removed once problem is fixed',

scenario: [
	InputsWidget.setSalaryField(SALARY),
	{
		'ResultsWidget.superbrut'	: greaterThan(SALARY),
		'ErrorWidget.title'			: false,
	}
]
