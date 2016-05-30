import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
class Question extends Component {
	render() {
		let {
			fields: {resume: choice},
			possibleChoices,
			handleSubmit,
			actions: {submitStep},
			formName,
			radioClick = handleSubmit(() => submitStep(formName)),
		} = this.props
		return (
			<span className="answer">
				{ possibleChoices.map(({value, text}) =>
						( <label key={value} className={classnames('radio', value === choice.value ? 'checked' : '')}>
								<input
									type="radio" {...choice} onClick={radioClick}
									value={value} checked={value === choice.value ? 'checked' : ''} />
									{text}
							</label>
						)
				)}
			</span>
		)
	}

}

export default reduxForm({destroyOnUnmount: false})(Question)
