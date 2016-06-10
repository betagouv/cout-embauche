import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

/* Decorate this component to avoid rewriting
the question and folded state markup : just output
here the user input you want to show.
This is a "Question" user input : he selects one of a list of button */
@FormDecorator
class Question extends Component {
	render() {
		let {
			fields: {resume: choice},
			possibleChoices,
		} = this.props
		return (
			<span className="answer">
				{ Object.keys(possibleChoices).map((value) =>
						( <label key={value} className={classnames('radio', value === choice.value ? 'checked' : '')}>
								<input
									type="radio" {...choice} onClick={this.submit(value)}
									value={value} checked={value === choice.value ? 'checked' : ''} />
								{possibleChoices[value]}
							</label>
						)
				)}
			</span>
		)
	}
	// How should the value be presented to the user once answered ?
	static humanAnswer(props, value) {
		return props.possibleChoices[value]
	}
	submit(value) {
		/* On radio click, just submit the form using redux-form's
		handleSumbit and trigger the SUMIT_STEP action that will mark this
		step in the state as completed.
		SUBMIT_STEP will also trigger an API call if specified in the props */

		let {
			variableName,
			formName,
			handleSubmit,
			actions: {submitStep},
		} = this.props

		return handleSubmit(() => submitStep(formName, variableName, value))
	}

}

export default reduxForm({destroyOnUnmount: false})(Question)
