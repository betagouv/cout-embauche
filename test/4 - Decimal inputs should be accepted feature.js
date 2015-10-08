description: 'Results should update when salary is updated',

scenario: [
	InputsWidget.setSalaryField(SALARY + DECIMALS),
	{
		'ResultsWidget.superbrut'	: greaterThan(SALARY),
		'ErrorWidget.title'			: false,
	}
]
