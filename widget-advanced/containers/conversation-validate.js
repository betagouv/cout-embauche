import steps from './conversation-steps'

export default values =>
	Object.keys(values).reduce((result, next) => {
		let value = values[next],
			{rework, validate} = steps[next],
			error = rework && validate && validate(rework(value))
		return Object.assign(result, error ? {[next]: error} : null)
	}, {})
