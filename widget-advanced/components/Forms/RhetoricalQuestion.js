import React, {Component} from 'react'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
export default class RhetoricalQuestion extends Component {
	render() {
		console.log(this.props)
		let {
			input,
			stepProps: {submit, possibleChoice: {text, value}},
		} = this.props
		return (
			<span className="answer">
				<label key={value} className={classnames('radio')}>
					<input
						type="radio" {...input} onClick={submit}
						value={value} />
					{text}
				</label>
			</span>
		)
	}

}
