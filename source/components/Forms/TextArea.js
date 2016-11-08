import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'
import {themeColour, textColour} from '../../themeColours'

@FormDecorator('text-area')
export default class Input extends Component {
	render() {
		let {
			name,
			input,
			stepProps: {submit, attributes},
			meta: {
				touched, error,
			},
		} = this.props,
			inputError = touched && error,
			sendButtonDisabled = !input.value || inputError

		return (
			<span>
				<span className="answer">
					<textarea
						{...attributes}
						{...input}
						id={'step-' + name}
						onKeyDown={({key, ctrlKey}) =>
							key == 'Enter' && ctrlKey && input.value && (
							!error ?
								submit() :
								input.onBlur() // blur will trigger the error
						)}
						/>
					<button className="send"
						style={{visibility: sendButtonDisabled ? 'hidden' : 'visible', color: textColour, background: themeColour}}
						onClick={() => !error ? submit() : null} >
						<span className="text">valider</span>
						<span className="icon">✓</span>
					</button>
				</span>
				{inputError && <span className="step-input-error">{error}</span>}
			</span>
		)
	}
}
