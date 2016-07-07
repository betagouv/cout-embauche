import React, { Component } from 'react'
import BasicInput from '../containers/BasicInput'
import AdvancedQuestions from '../containers/AdvancedQuestions'

export default class Input extends Component {
	render() {
		if (!this.props.showInput) return null
		return (
			<div>
				<BasicInput />
				<AdvancedQuestions />
			</div>
		)
	}
}
