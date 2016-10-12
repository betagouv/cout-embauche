import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'
import {answer} from './userAnswerButtonStyle'

@FormDecorator
export default class RhetoricalQuestion extends Component {
	render() {
		let {
			input,
			stepProps: {submit, possibleChoice},
		} = this.props

		if (!possibleChoice) return null // No action possible

		let {text, value} = possibleChoice

		return (
			<span className="answer">
				<label key={value} className="radio" style={answer}>
					<input
						type="radio" {...input} onClick={submit}
						value={value} />
					{text}
				</label>
			</span>
		)
	}

}
