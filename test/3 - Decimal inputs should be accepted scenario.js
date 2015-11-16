description: 'Results should update when salary is updated',

steps: [
	InputsComponent.setSalaryField(SALARY + DECIMALS),
	{
		'ResultsComponent.superbrut'	: greaterThan(0),
		'ErrorComponent.title'			: false,
	}
]
