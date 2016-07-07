import React  from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import BasicInput from './BasicInput'
import InfoZone from '../components/InfoZone'
import AdvancedQuestions from '../containers/AdvancedQuestions'
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
					{
						activeSection == 'input' &&
						<div>
							<BasicInput />
							<AdvancedQuestions />
						</div>
					}
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
