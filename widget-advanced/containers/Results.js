import React, { Component } from 'react'
import { formValueSelector } from 'redux-form'
import {connect} from 'react-redux'
import Summary from '../components/Summary'
import Details from '../components/Details'
import pick from 'object.pick'

let selector = formValueSelector('basicInput')

@connect(state => ({
	typeEntreprise: selector(state, 'typeEntreprise'),
	typeSalaireEntré: selector(state, 'typeSalaireEntré'),
	results: state => state.results,
}))
export default class Results extends Component {
	render() {
		return (
			<div>
				<Summary {...pick(this.props, 'typeSalaireEntré', 'typeEntreprise')} />
				<Details />
			</div>
		)
	}
}
