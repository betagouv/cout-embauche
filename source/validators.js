// Regexps used to validate processed user inputs

export let number = {
	pre: v =>
		v.replace(/,/g, '.') // commas -> dots
		.replace(/\s/g, ''), // remove spaces
	test: /^[0-9]+(\.[0-9]+)?$/,
	error: 'Vous devez entrer un nombre',
}
