description: 'Results should update when salary is updated',

scenario: [
	InputsWidget.setSalaryField(UPDATED_SALARY + ',42\n'),
	{
		'ResultsWidget.superbrut'	: greaterThan(UPDATED_SALARY),
		'ErrorWidget.title'			: false,
	}
]
