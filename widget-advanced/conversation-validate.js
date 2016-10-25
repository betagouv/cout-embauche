import steps from './conversation-steps'

export default values =>
	Object.keys(values).reduce((result, next) => {
		let value = values[next],
			stepData = steps[next],
			valueType = stepData.valueType,
			validator = valueType ? valueType.validator : stepData.validator
		if (!validator) return result

		let pre = validator.pre,
			error = pre ? validator.validate(pre(value)) : validator.validate(value)

		return Object.assign(result, error ? {[next]: error} : null)
	}, {})
