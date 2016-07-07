import React  from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import InfoZone from '../components/InfoZone'
import InputSection from '../components/InputSection'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'
import {INITIAL_REQUEST, TOGGLE_ADVANCED_SECTION} from '../actions'

let selector = formValueSelector('basicInput')

@connect(state => ({
	activeSection: state.activeSections.top,
	showAdvanced: state.activeSections.advanced,
	infoAlternance: selector(state, 'typeEmployé') == 'apprenti',
}), dispatch => ({
	makeInitialRequest: () => dispatch({type: INITIAL_REQUEST}),
	toggleAdvancedSection: () => dispatch({type: TOGGLE_ADVANCED_SECTION}),
}))
export default class Widget extends React.Component {
	render() {
		let {activeSection, showAdvanced, toggleAdvancedSection} = this.props
		return (
				<div>
					<InputSection
						showInput={activeSection == 'input'}
						showAdvanced={showAdvanced}
						toggleAdvancedSection={toggleAdvancedSection}
					/>
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
