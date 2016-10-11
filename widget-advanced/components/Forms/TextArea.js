import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'

@FormDecorator
export default class Input extends Component {
	render() {
		let {
			name,
			input,
			stepProps: {submit, attributes},
			meta: {
				touched, error,
			},
		} = this.props

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
					<button className="send" disabled={!input.value || (touched && error)}
						onClick={() => !error ? submit() : null} >
						<span className="text">valider</span>
						<span className="icon">✓</span>
					</button>
				</span>
				{touched && error && <span className="step-input-error">{error}</span>}
			</span>
		)
	}
}
