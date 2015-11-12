description: 'Errors should be removed once problem is fixed',

steps: [
	InputsComponent.setSalaryField(SALARY),
	{
		'ResultsComponent.superbrut'	: greaterThan(SALARY),
		'ErrorComponent.title'			: false,
	}
]
