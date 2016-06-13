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
			fields: {resume: chosen},
			choices,
			/* On radio click, just submit the form using the decorator's submit function */
			submit,
		} = this.props
		return (
			<span className="answer">
				{ choices.map((choice) =>
						( <label key={choice} className={classnames('radio', {checked: choice === chosen.value})}>
								<input
									type="radio" {...chosen} onClick={submit(choice)}
									value={choice} checked={choice === chosen.value ? 'checked' : ''} />
								{choice}
							</label>
						)
				)}
			</span>
		)
	}
}

export default reduxForm({destroyOnUnmount: false})(Question)
