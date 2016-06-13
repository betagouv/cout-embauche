import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

@FormDecorator
class Input extends Component {
	render() {
		let {
			fields: {resume: choice},
			formName,
			submit,
			attributes,
			valueType,
		} = this.props,
			answerSuffix = valueType && new valueType().suffix,
			suffixed = answerSuffix != null

		return (
			<span className="answer">
				<input
					{...attributes}
					{...choice}
					id={'input-' + formName}
					className={classnames({suffixed})}
					/>
				{ suffixed &&
					<label className="suffix" htmlFor={'input-' + formName}>
						{answerSuffix}
					</label>}
				<button className="send" disabled={!choice.value} onClick={submit(choice.value)}>
					➤
				</button>
			</span>
		)
	}
}


export default reduxForm({destroyOnUnmount: false})(Input)
