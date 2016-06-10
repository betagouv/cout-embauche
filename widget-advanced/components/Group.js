import React, {Component} from 'react'
import GroupTitle from './GroupTitle'

/* Groups can be used only to avoid repeating conditions for all its children,
or to gather a set of questions that will be eventually collapsed to a final @value */
export default class Group extends Component {

	render() {
		let {when, steps, foldTrigger, children} = this.props,
			folded = foldTrigger ? steps[foldTrigger] : false

		if (when) {
			return (
				<div className="form-group">
					{this.renderTitle(folded)}
					{folded ? null : children}
				</div>
			)
		} else return null
	}

	renderTitle(folded) {
		let {foldTrigger, unsubmitStep, text, answer, answerSuffix} = this.props,
			/* The first question of the group,
			to unfold if the users wants to change his answers */
			headerClick = () => unsubmitStep(foldTrigger)

		return(
			text &&
				<div className="header">
					<a className="ignore" onClick={this.ignoreGroup}>
						passer
					</a>
					<GroupTitle {...{text, folded}} onClick={headerClick}/>
					{folded &&
						<span className="resume">{answer + ' ' + answerSuffix}</span>
					}
				</div>
		)

	}

	ignoreGroup() {

	}

}
