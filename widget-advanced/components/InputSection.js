import React, { Component } from 'react'
import BasicInput from '../containers/BasicInput'
import AdvancedQuestions from '../containers/AdvancedQuestions'

export default class Input extends Component {
	render() {
		let {showInput, showAdvanced, toggleAdvancedSection, basicInputTouched} = this.props
		if (!showInput) return null

		return (
			<div>
				<BasicInput />
				{ showAdvanced &&
					<AdvancedQuestions />
				}
				<div id="user-next-action">
				{
					basicInputTouched ?
					<button className="action show-advanced"
						autoComplete="off"
						onClick={toggleAdvancedSection}	>
						{ !showAdvanced ?
								<span>{'Compléter l\'estimation'}</span>:
								<span>Réinitialiser</span>
						}
					</button> :
					<div id="input-tip">
						Renseignez votre situation ci-dessus
					</div>
				}
				</div>

			</div>
		)
	}
}
