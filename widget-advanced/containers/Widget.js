import React  from 'react'
import {connect} from 'react-redux'
import BasicInput from './BasicInput'
import InfoZone from '../components/InfoZone'
import AdvancedQuestions from '../containers/AdvancedQuestions'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'

@connect(state => ({
	activeSection: state.activeSection,
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
}
