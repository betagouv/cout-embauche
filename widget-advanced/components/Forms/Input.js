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
			answerSuffix,
		} = this.props
		return (
			<span className="answer">
				<input
					{...attributes}
					{...choice}
					id={'input-' + formName}
					className={classnames({suffixed: answerSuffix})}
					/>
				{ answerSuffix &&
					<label className="suffix" htmlFor={'input-' + formName}>
						{answerSuffix}
					</label>}
				<button className="send" disabled={!choice.value} onClick={submit(choice.value)}>
					&#10548;
				</button>
			</span>
		)
	}
	static humanAnswer(props, value) {
		return value + ' ' + props.answerSuffix
	}
}


export default reduxForm({destroyOnUnmount: false})(Input)
