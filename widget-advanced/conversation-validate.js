import steps from './conversation-steps'

export default values =>
	values == null ? {} :
	Object.keys(values).reduce((result, next) => {
		let value = values[next],
			{valueType = {}, validator} = steps[next],
			{pre = v => v, validate} = Object.assign({}, validator, valueType.validator)
		if (!validator) return result

		let error = validate(pre(value))

		return Object.assign(result, error ? {[next]: error} : null)
	}, {})
