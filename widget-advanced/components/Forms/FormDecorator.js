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
				form: {[formName]: formState},
				resume = formState && formState.resume.value,
				submitted,
			} = this.props

			let
				visible = when == undefined ? true : when,
				/* Should this form be unfolded (ready to receive user action)
				or in its folded state, displaying a resume. */
				unfolded = !submitted[formName]

			if (visible) {
				return (
				<section className={classNames('step', {unfolded})}>
					{this.state.helpVisible && this.renderHelpBox()}
					{this.renderHeader(unfolded, resume)}
					{unfolded &&
						<form>
							<fieldset>
								{ /* <a className="cancel" href="#" onClick={() => console.log('utilité de ce bouton encore à voir')}>annuler</a> */}
								{ /* TODO : make this following content float right */ }
								<DecoratedComponent {...this.props} />
							</fieldset>
						</form>}
				</section>
			)} else return null
		}

		/*
			< Le titre de ma question > ----------- < (?) / résultat >
		*/
		renderHeader(unfolded, resume) {
			let {
				handleSubmit,
				actions: {unsubmitStep},
				formName,
				headerClick = handleSubmit(() => unsubmitStep(formName)),
			} = this.props

			return (
				<span className="form-header" onClick={headerClick}>
				{ unfolded ? this.renderQuestionHeader() : this.renderResumeHeader(resume)}
				</span>
			)
		}

		renderQuestionHeader = () =>
				<span>
					<h1>{this.props.question}</h1>
					{this.props.helpText &&
						<span
						className="question-mark"
						onClick={() => this.setState({helpVisible: true})}>?</span>
					}
				</span>

		renderResumeHeader = (resume) =>
			<span>
				<h1>{this.props.title}</h1>
				<ReactCSSTransitionGroup
						transitionAppear={true}
						transitionName="answer"
						transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						<span key="1" className="resume">{typeof resume === 'object' ? resume.text : resume}</span>
					</ReactCSSTransitionGroup>
			</span>

		renderHelpBox = () =>
			<div className="help-box">
				<a
					className="close-help"
					onClick={() => this.setState({helpVisible: false})}>&#10005;</a>
				<p>{this.props.helpText}</p>
			</div>
	}
