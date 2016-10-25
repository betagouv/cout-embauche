import steps from './conversation-steps'

// Extraction des valeurs initiales de l'object précédent
export default
	Object.keys(steps)
		.reduce((final, i) => {
			let step = steps[i],
				initial = step.initial
			if (initial == null) return final
			return Object.assign(final, {[i]: initial})
		}, {})
