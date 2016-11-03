import React, { Component } from 'react'
import { formValueSelector } from 'redux-form'
import {connect} from 'react-redux'
import Summary from '../components/Summary'
import Details from '../components/Details'
import {TOGGLE_TOP_SECTION, TOGGLE_ADVANCED_SECTION} from '../actions'

let fmt = new Intl.NumberFormat('fr-FR').format

let selector = formValueSelector('basicInput'),
	advancedSelector = formValueSelector('advancedQuestions')

@connect(state => ({
	typeEntreprise: selector(state, 'typeEntreprise'),
	typeSalaireEntré: selector(state, 'typeSalaireEntré'),
	results: state.results,
	advancedQuestions: name => advancedSelector(state, name)
}), dispatch => ({
	toggleSection: () =>
		dispatch({type: TOGGLE_TOP_SECTION}),
	openAdvancedSection: () => {
		dispatch({type: TOGGLE_TOP_SECTION})
		dispatch({type: TOGGLE_ADVANCED_SECTION})
	}
}))
export default class Results extends Component {
	render() {
		return (
			<div>
				<Summary {...this.props} humanizeFigures={this.humanizeFigures(0)}/>
				{this.props.showDetails &&
					<Details
						openAdvancedSection={this.props.openAdvancedSection}
						advancedQuestions={this.props.advancedQuestions}
						results={this.props.results}
						humanizeFigures={this.humanizeFigures(2)} />
				}
			</div>
		)
	}
	humanizeFigures = decimalDigits => value => value == null ? '...' : fmt(value.toFixed(decimalDigits))

}
