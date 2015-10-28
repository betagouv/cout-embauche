description: 'Results should update when salary is updated',

scenario: [
	InputsWidget.setSalaryField(SALARY + DECIMALS),
	{
		'ResultsWidget.superbrut'	: greaterThan(0),
		'ErrorWidget.title'			: false,
	}
]
