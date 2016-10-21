import React, {Component} from 'react'
import GroupTitle from './GroupTitle'
import classnames from 'classnames'
import {themeColour, textColour} from '../themeColours'
import {answered} from './Forms/userAnswerButtonStyle'

/* Groups can be used only to avoid repeating conditions for all its children,
or to gather a set of questions that will be eventually collapsed to a final @value,
marked with the 'explicit' class  */
export default class Group extends Component {

	render() {
		let {visible, steps, foldTrigger, children, text} = this.props,
			folded = foldTrigger ? steps.get(foldTrigger) && steps.get(foldTrigger) != 'editing' : false

		if (!visible) return null

		return (
			<div className={classnames('form-group', {folded, unfolded: !folded, explicit: text})}>
				{this.renderHeader(folded)}
				<div className="group-content" style={!folded && text ? {borderLeft: '1px solid' + themeColour} : {}}>
					{folded ? null : children}
				</div>
			</div>
		)
	}

	renderHeader(folded) {
		let {
			foldTrigger, editStep, text, answer,
			valueType,
		} = this.props,
			headerClick = () => editStep(foldTrigger)

		return(
			text &&
				<div className="header">
					<GroupTitle {...{text, folded}} onClick={headerClick}/>
					{folded &&
						<span className="resume" style={answered}>{valueType ? new valueType().human(answer) : answer }</span>
					}
				</div>
		)
	}

}
