import React, { Component } from 'react'
import BasicInput from '../containers/BasicInput'
import AdvancedQuestions from '../containers/AdvancedQuestions'

export default class Input extends Component {
	render() {
		let {showInput, showAdvanced, toggleAdvancedSection} = this.props
		if (!showInput) return null
		return (
			<div>
				<BasicInput />
				{ showAdvanced &&
					<AdvancedQuestions />
				}
				<button className="action show-advanced" autoComplete="off"
					onClick={toggleAdvancedSection}>
					{ !showAdvanced ?
						<span>{'Continuer l\'estimation'}</span>:
						<span>Réinitialiser</span>
					}
				</button>
			</div>
		)
	}
}
