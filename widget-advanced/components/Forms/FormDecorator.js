import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'

/*
This higher order component wraps "Form" components (e.g. Question.js), that represent user inputs,
with a header, click actions and more goodies.

Read https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
to understand higher order components.
*/
export var FormDecorator = DecoratedComponent =>
	@connect( //... this helper directly to redux state to avoid passing more props
		state => state,
		(dispatch) => ({
			actions: bindActionCreators(actions, dispatch),
		})
	)
	class extends Component {
		state = {
			helpVisible: false,
		}
		render() {
			let {
				when,
				formName,
				steps,
				handleSubmit,
				actions: {submitStep},
				variableName,
				serialise,
				valueType,
				valueIfIgnored,
				fields: {resume: field},
			} = this.props
			/* Call redux-form's handleSumbit to keep the form in state
			and trigger the SUMIT_STEP action that will mark this
			step in the state as completed.
			SUBMIT_STEP will also trigger an API call if specified in the props.
			The value can be serialised before being sent online,
			e.g. to transform a percentage to a ratio */
			serialise = serialise || valueType && new valueType().serialise
			let	submit = (value, ignored) => {
				return handleSubmit(() => submitStep(formName, variableName, value, serialise, ignored))
			}

			let ignoreStep = () => {
				field.onChange(valueIfIgnored)
				return submit(valueIfIgnored, true)()
			}

			let
				visible = when == undefined ? true : when,
				/* Should this form be unfolded (ready to receive user action)
				or in its folded state, displaying a resume. */
				unfolded = !steps[formName]

			if (visible) {
				return (
				<section className={classNames('step', {unfolded})}>
					{this.state.helpVisible && this.renderHelpBox()}
					{this.renderHeader(unfolded)}
					{unfolded &&
						<form>
							<fieldset>
								{ valueIfIgnored &&
									<a className="ignore" onClick={ignoreStep}>
										passer
									</a>
								}
								<DecoratedComponent {...this.props} {...{submit}} />
							</fieldset>
						</form>}
				</section>
			)} else return null
		}

		/*
			< Le titre de ma question > ----------- < (? bulle d'aide) / résultat >
		*/
		renderHeader(unfolded) {
			let {
				handleSubmit,
				actions: {unsubmitStep},
				formName,
				headerClick = handleSubmit(() => unsubmitStep(formName)),
			} = this.props

			return (
				<span className="form-header" onClick={headerClick}>
				{ unfolded ? this.renderQuestion() : this.renderTitleAndAnswer()}
				</span>
			)
		}

		renderQuestion = () =>
				<span>
					<h1>{this.props.question}</h1>
					{this.props.helpText &&
						<span
						className="question-mark"
						onClick={() => this.setState({helpVisible: true})}>?</span>
					}
				</span>

		renderTitleAndAnswer() {
			let {
				formName,
				form: {[formName]: formState},
				valueType,
				human,
			} = this.props,
				value = formState.resume.value,
				// Show a beautiful answer to the user, rather than the technical form value
				humanFunc = human || valueType && new valueType().human || (v => v)

			return (
				<span>
					<h1>{this.props.title}</h1>
					<ReactCSSTransitionGroup
							transitionAppear={true}
							transitionName="answer"
							transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
							<span key="1" className="resume">{humanFunc(value)}</span>
						</ReactCSSTransitionGroup>
				</span>)
		}

		renderHelpBox = () =>
			<div className="help-box">
				<a
					className="close-help"
					onClick={() => this.setState({helpVisible: false})}>&#10005;</a>
				<p>{this.props.helpText}</p>
			</div>
	}
