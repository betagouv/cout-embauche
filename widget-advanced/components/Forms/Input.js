import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
export default class Input extends Component {
	render() {
		let {
			name,
			input,
			input: {stepProps: {submit, valueType}, ...rest},
			touched, error, disabled,
		} = this.props,
			answerSuffix = valueType && new valueType().suffix,
			suffixed = answerSuffix != null

		return (
			<span className="answer">
				<input
					type="text" {...rest}
					className={classnames({suffixed})}
					id={'step-' + name} />
				{ suffixed &&
					<label className="suffix" htmlFor={'step-' + name}>
						{answerSuffix}
					</label>
				}
				<button className="send" disabled={!input.value} onClick={submit}>
					<span className="text">valider</span>
					<span className="icon">✓</span>
				</button>
				{touched && error && !disabled && <span className="error">{error}</span>}
			</span>
		)
	}
}
