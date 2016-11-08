import React, {Component} from 'react'
import GroupTitle from './GroupTitle'
import classnames from 'classnames'
import {themeColour} from '../themeColours'
import { connect } from 'react-redux'
import { change} from 'redux-form'
import {submitStep, editStep} from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import IgnoreStepButton from './Forms/IgnoreStepButton'
import conversationData from '../conversation-steps'
import {formValueSelector} from 'redux-form'
import StepAnswer from './Forms/StepAnswer'


/* Groups can be used only to avoid repeating conditions for all its children,
or to gather a set of questions that will be eventually collapsed to a final @value,
marked with the 'explicit' class  */
@connect(state => ({
	steps: state.steps,
	formValue: field => formValueSelector('advancedQuestions')(state, field)
}), dispatch => ({
	editStep: name => dispatch(editStep(name)),
	submitStep: (name, ignored) => dispatch(submitStep(name, ignored)),
	setFormValue: (field, value) => dispatch(change('advancedQuestions', field, value)),
}))
export default class Group extends Component {

	render() {
		let {visible, steps, foldTrigger, children, text} = this.props,
			folded = foldTrigger ? steps.get(foldTrigger) && steps.get(foldTrigger) != 'editing' : false

		if (!visible) return null

		return (
			<div className={classnames('form-group', {folded, unfolded: !folded, explicit: text})}>
				{this.renderHeader(folded)}
				<div className="group-content" style={!folded && text ? {borderLeft: '1px dashed' + themeColour} : {}}>
					<ReactCSSTransitionGroup
						transitionName="group-animated"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={200} >
						{!folded && <ul className="group-items">
							{children.map(child =>
								<li key={child.props.name}>
									{child}
								</li>)}
						</ul>}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}

	renderHeader(folded) {
		let {
			steps, foldTrigger, editStep, setFormValue, submitStep,
			text, valueType, formValue,
		} = this.props

		if (!text) return null

		let
			headerClick = () => editStep(foldTrigger),
			{defaultValue, human} = conversationData[foldTrigger],
			ignoreGroup = () => {
				setFormValue(foldTrigger, defaultValue)
				submitStep(foldTrigger, true)
			},
			value = formValue(foldTrigger),
			ignored = steps.get(name) === 'ignored'

		return (
			<div className="header">
				<GroupTitle {...{text, folded}} onClick={headerClick} />
				{ !folded && <IgnoreStepButton action={ignoreGroup} /> }
				{ folded &&
					<StepAnswer	{...{value, human, valueType, ignored}} />
				}
			</div>
		)

	}

}
