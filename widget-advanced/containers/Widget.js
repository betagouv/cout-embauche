import React  from 'react'
import {connect} from 'react-redux'
import BasicInput from './BasicInput'
import InfoZone from '../components/InfoZone'
import AdvancedQuestions from '../containers/AdvancedQuestions'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'
import {INITIAL_REQUEST} from '../actions'

@connect(state => ({
	activeSection: state.activeSection,
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
					<InfoZone />
					<Results showDetails={activeSection == 'details'}/>
					<Affiliation />
				</div>
		)
	}
	componentDidMount() {
		this.props.makeInitialRequest()
	}
}
