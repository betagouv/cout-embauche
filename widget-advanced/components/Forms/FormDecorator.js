import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Field, formValueSelector, change} from 'redux-form'
import {submitStep, editStep} from '../../actions'
import questionSet from '../../containers/conversation-question-set'
/*
This higher order component wraps "Form" components (e.g. Question.js), that represent user inputs,
with a header, click actions and more goodies.

Read https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
to understand those precious higher order components.
*/
let selector = formValueSelector('advancedQuestions')

export var FormDecorator = RenderField =>
	@connect( //... this helper directly to the redux state to avoid passing more props
		state => {
			let advancedQuestions = state.form.advancedQuestions
			return {
				steps: state.steps,
				answers: advancedQuestions && advancedQuestions.values,
			}
		},
		dispatch => ({
			editStep: name => dispatch(editStep(name)),
			submitStep: (name, ignored) => dispatch(submitStep(name, ignored)),
			setFormValue: (field, value) => dispatch(change('advancedQuestions', field, value)),
		})
	)
	class extends Component {
		state = {
			helpVisible: false,
		}
		render() {
			let {
				name,
				visible,
				steps,
				submitStep,
				possibleChoice, // should be found in the question set thoritically, but it is used for a single choice question -> the question itself is dynamic and cannot be input as code
			} = this.props

			let {
				valueType,
				valueIfIgnored,
				attributes,
				choices,
				optionsURL,
				human,
			} = questionSet[name]

			let ignoreStep = () => {
				// Renseigne automatiquement la valeur de la saisie (en se plongeant dans les entrailles de redux-form)
				this.props.setFormValue(name, valueIfIgnored)
				submitStep(name, true)
			}

				//TODO field.onChange(valueIfIgnored)

			/* La saisie peut être cachée car ce n'est pas encore son tour,
			ou parce qu'elle a déjà été remplie. Dans ce dernier cas, un résumé
			de la réponse est affiché */
			let stepState = steps.get(name),
				completed = stepState && stepState != 'editing',
				unfolded = !completed

			if (!visible) return null

			/* Nos propriétés personnalisées à envoyer au RenderField.
			Elles sont regroupées dans un objet précis pour pouvoir être enlevées des
			props passées à ce dernier, car React 15.2 n'aime pas les attributes inconnus
			des balises html, <input> dans notre cas.
			*/
			let stepProps = {
				attributes, /* Input component's html attributes */
				choices,  /* Question component's radio choices */
				optionsURL, /* Select component's data source */
				possibleChoice, /* RhetoricalQuestion component's only choice :'-( */
				submit: () => submitStep(name),
				valueType,
			}

			return (
			<div className={classNames('step', {unfolded})}>
				{this.state.helpVisible && this.renderHelpBox()}
				{this.renderHeader(unfolded, valueType, human)}
				{unfolded &&
						<fieldset>
							{ valueIfIgnored &&
								<a className="ignore" onClick={ignoreStep}>
									passer
								</a>
							}
							<Field
								component={RenderField}
								name={name}
								stepProps={stepProps}
								/>
						</fieldset>
				}
			</div>
			)
		}

		/*
			< Le titre de ma question > ----------- < (? bulle d'aide) OU résultat >
		*/
		renderHeader(unfolded, valueType, human) {
			return (
				<span className="form-header" >
				{ unfolded ? this.renderQuestion() : this.renderTitleAndAnswer(valueType, human)}
				</span>
			)
		}

		renderQuestion = () =>
				<span>
					<h1>{this.props.question}</h1>
					{questionSet[this.props.name].helpText &&
						<span
						className="question-mark"
						onClick={() => this.setState({helpVisible: true})}>
							?
						</span>
					}
				</span>

		renderTitleAndAnswer(valueType, human) {
			let {
				name,
				editStep,
				answers,
			} = this.props,
				value = answers[name],
				// Show a beautiful answer to the user, rather than the technical form value
				humanFunc = human || valueType && new valueType().human || (v => v)

			return (
				<span onClick={() => editStep(name)}>
					<h1>{this.props.title}</h1>
					<ReactCSSTransitionGroup
							transitionAppear={true}
							transitionName="answer"
							transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
							<span key="1" className="resume">{humanFunc(value)}</span>
						</ReactCSSTransitionGroup>
				</span>)
		}

		renderHelpBox() {
			let {name} = this.props,
				helpText = questionSet[name].helpText,
				helpComponent =
					typeof helpText === 'string' ?
					(<p>{helpText}</p>) :
					helpText

			return <div className="help-box">
				<a
					className="close-help"
					onClick={() => this.setState({helpVisible: false})}>
					<span className="close-text">revenir</span> &#10005;
				</a>
				{helpComponent}
			</div>
		}
	}
