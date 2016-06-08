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
			/* On radio click, just submit the form using redux-form's
			handleSumbit and trigger the SUMIT_STEP action that will mark this
			step in the state as completed */
			variableName,
			radioClick = (value) => handleSubmit(() => submitStep(formName, variableName, value)),
		} = this.props
		return (
			<span className="answer">
				{ possibleChoices.map(({value, text}) =>
						( <label key={value} className={classnames('radio', value === choice.value ? 'checked' : '')}>
								<input
									type="radio" {...choice} onClick={radioClick(value)}
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
