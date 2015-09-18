description: 'Results should update when salary is updated',

scenario: [
	InputsWidget.setSalaryField(UPDATED_SALARY + '\n'),
	{
		'ResultsWidget.superbrut'	: greaterThan(UPDATED_SALARY),
		'ErrorWidget.title'			: false,
	}
]
