import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
export default class Input extends Component {
	render() {
		let {
			name,
			input,
			stepProps: {attributes, submit, valueType},
			meta: {
				touched, error,
			},
		} = this.props,
			answerSuffix = valueType && new valueType().suffix,
			suffixed = answerSuffix != null
		return (
			<span>
				<span className="answer">
					<input
						type="text" {...input}
						className={classnames({suffixed})}
						id={'step-' + name}
						{...attributes}
						onKeyDown={({key}) =>
							key == 'Enter' && input.value && (
							!error ?
								submit() :
								input.onBlur() // blur will trigger the error
						)}
						/>
					{ suffixed &&
						<label className="suffix" htmlFor={'step-' + name}>
							{answerSuffix}
						</label>
					}
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
