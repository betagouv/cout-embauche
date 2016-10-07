// Regexps used to validate processed user inputs

let validators = {
	number: {
		test: /^[0-9]+\.?[0-9]+$/,
		error: 'Vous devez entrer un nombre',
	},
}

// play the regexp and output an error if it failed
export default (value, format) => {
	let {test, error} = validators[format]
	if (test.test(value))
		return error
}
