description: 'Results should update when salary is updated',

steps: [
	InputsComponent.setSalaryField(SALARY),
	{
		'ResultsComponent.superbrut'	: greaterThan(SALARY),
		'ErrorComponent.title'			: false,
	}
]
