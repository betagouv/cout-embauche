import React  from 'react'
import BasicInput from './BasicInput'
import InfoZone from '../components/InfoZone'
import AdvancedQuestions from '../containers/AdvancedQuestions'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'

export default class Widget extends React.Component {
	render() {
		return (
				<div>
					<BasicInput />
					<InfoZone />
					<AdvancedQuestions />
					<Results />
					<Affiliation />
				</div>
		)
	}
}
