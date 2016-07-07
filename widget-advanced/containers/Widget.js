import React  from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import InfoZone from '../components/InfoZone'
import Input from '../components/Input'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'
import {INITIAL_REQUEST} from '../actions'

let selector = formValueSelector('basicInput')

@connect(state => ({
	activeSection: state.activeSection,
	infoAlternance: selector(state, 'typeEmployé') == 'apprenti',
}), dispatch => ({
	makeInitialRequest: () => dispatch({type: INITIAL_REQUEST}),
}))
export default class Widget extends React.Component {
	render() {
		let {activeSection} = this.props
		return (
				<div>
					<Input showInput={activeSection == 'input'}/>
					<InfoZone infoAlternance={this.props.infoAlternance} />
					<Results showDetails={activeSection == 'details'}/>
					<Affiliation />
				</div>
		)
	}
	componentDidMount() {
		this.props.makeInitialRequest()
	}
}
