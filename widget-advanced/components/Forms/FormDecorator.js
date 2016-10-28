import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Field, change} from 'redux-form'
import {submitStep, editStep} from '../../actions'
import conversationSteps from '../../conversation-steps'
import IgnoreStepButton from './IgnoreStepButton'
import {themeColour, textColourOnWhite} from '../../themeColours'
import {answered, answer} from './userAnswerButtonStyle'
import StepAnswer from './StepAnswer'

/*
This higher order component wraps "Form" components (e.g. Question.js), that represent user inputs,
with a header, click actions and more goodies.

Read https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
to understand those precious higher order components.
*/

export var FormDecorator = formType => RenderField =>
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
				possibleChoice, // should be found in the question set theoritically, but it is used for a single choice question -> the question itself is dynamic and cannot be input as code,
			} = this.props

			let stepData = conversationSteps[name]

			if (!stepData)
				throw Error('Step ' + name + ', used in Conversation, misses an entry in conversation-steps.js')

			let	{
					valueType,
					valueIfIgnored,
					attributes,
					choices,
					optionsURL,
					human,
					helpText,
				} = stepData

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

			/* There won't be any answer zone here, widen the question zone */
			let wideQuestion = formType == 'rhetorical-question' && !possibleChoice

			return (
			<div className={classNames('step', {unfolded}, formType)} >
				{this.state.helpVisible && this.renderHelpBox()}
				{this.renderHeader(unfolded, valueType, human, helpText, wideQuestion)}
				{unfolded &&
						<fieldset>
							{ valueIfIgnored &&
								<IgnoreStepButton name={name} action={ignoreStep}/>
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
		renderHeader(unfolded, valueType, human, helpText, wideQuestion) {
			return (
				<span className="form-header" >
				{ unfolded ? this.renderQuestion(unfolded, helpText, wideQuestion) : this.renderTitleAndAnswer(valueType, human)}
				</span>
			)
		}

		renderQuestion = (unfolded, helpText, wideQuestion) =>
				<span>
					<h1
						style={{
							border: '2px solid ' + themeColour, // higher border width and colour to emphasize focus
							background: 'none',
							color: textColourOnWhite,
							maxWidth: wideQuestion ? '95%' : '',
						}}
						>{this.props.question}</h1>
					{helpText &&
						<span
						className="help-button"
						onClick={() => this.setState({helpVisible: true})}>
							aide
						</span>
					}
				</span>

		renderTitleAndAnswer(valueType, human) {
			let {
				name,
				editStep,
				answers,
				steps,
			} = this.props,
				value = answers[name],
				ignored = steps.get(name) === 'ignored'


			return (
				<span onClick={() => editStep(name)}>
					<h1>{this.props.title}</h1>
						<StepAnswer	{...{value, human, valueType, ignored}} />
				</span>)
		}

		renderHelpBox() {
			let {name} = this.props,
				helpText = conversationSteps[name].helpText,
				helpComponent =
					typeof helpText === 'string' ?
					(<p>{helpText}</p>) :
					helpText

			return <div className="help-box">
				<a
					className="close-help"
					onClick={() => this.setState({helpVisible: false})}>
					<span className="close-text">revenir <span className="icon">&#x2715;</span></span>
				</a>
				{helpComponent}
			</div>
		}
	}
