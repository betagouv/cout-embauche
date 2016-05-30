import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'

@FormDecorator
class Input extends Component {
	render() {
		let {
			fields: {resume: choice},
			handleSubmit,
			actions: {submitStep},
			formName,
			submit = handleSubmit(() => submitStep(formName)),
			attributes,
			unit,
			hasUnit = unit ? 'has-unit' : '',
		} = this.props
		return (
			<span className="answer">
				<input
					{...attributes}
					{...choice}
					id={'input-' + formName}
					className={hasUnit}
					/>
				{ hasUnit ?
					<label className="unit" htmlFor={'input-' + formName}>
						{unit}
					</label> : null}
				<button className="send" disabled={!choice.value} onClick={submit}>
					&#10548;
				</button>
			</span>

		)
	}

}

export default reduxForm({destroyOnUnmount: false})(Input)
