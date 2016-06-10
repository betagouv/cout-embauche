import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
class RhetoricalQuestion extends Component {
	render() {
		let {
			fields: {resume: choice},
			submit,
			possibleChoice: {text, value},
		} = this.props
		return (
			<span className="answer">
				<label key={value} className={classnames('radio')}>
					<input
						type="radio" {...choice} onClick={submit(value)}
						value={value} />
					{text}
				</label>
			</span>
		)
	}

}

export default reduxForm({destroyOnUnmount: false})(RhetoricalQuestion)
