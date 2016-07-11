import React, {Component} from 'react'
import GroupTitle from './GroupTitle'
import classnames from 'classnames'

/* Groups can be used only to avoid repeating conditions for all its children,
or to gather a set of questions that will be eventually collapsed to a final @value,
marked with the 'explicit' class  */
export default class Group extends Component {

	render() {
		let {visible, steps, foldTrigger, children, text} = this.props,
			folded = foldTrigger ? steps.get(foldTrigger) : false

		if (visible) {
			return (
				<div className={classnames('form-group', {folded, unfolded: !folded, explicit: text})}>
					{this.renderHeader(folded)}
					<div className="group-content">
						{folded ? null : children}
					</div>
				</div>
			)
		} else return null
	}

	renderHeader(folded) {
		let {
			foldTrigger, unsubmitStep, text, answer,
			valueType,
		} = this.props,
			headerClick = () => unsubmitStep(foldTrigger)

		return(
			text &&
				<div className="header">
					<GroupTitle {...{text}} onClick={headerClick}/>
					{folded &&
						<span className="resume">{valueType ? new valueType().human(answer) : answer }</span>
					}
				</div>
		)
	}

}
