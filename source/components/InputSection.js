import React, { Component } from 'react'
import {connect} from 'react-redux'
import BasicInput from '../containers/BasicInput'
import Conversation from '../containers/Conversation'
import InfoZone from './InfoZone'

@connect(state => ({themeColours: state.themeColours, pending: state.pending}))
export default class Input extends Component {
	render() {
		let {showInput, showAdvanced} = this.props

		return (
			<div hidden={!showInput}>
				<BasicInput />
				{ showAdvanced &&
					<Conversation />
				}
				<InfoZone {...this.props} />
			</div>
		)
	}
}
