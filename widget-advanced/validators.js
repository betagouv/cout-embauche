// Regexps used to validate processed user inputs

export let number = {
	pre: v =>
		v.replace(/,/g, '.') // commas -> dots
		.replace(/\s/g, ''), // remove spaces
	test: /^[0-9]+(\.[0-9]+)?$/,
	error: 'Vous devez entrer un nombre',
}

//
// // play the regexp and output an error if it failed
// export default (value, format) => {
// 	let {test, error} = validators[format]
// 	if (!test.test(value))
// 		return error
// }
