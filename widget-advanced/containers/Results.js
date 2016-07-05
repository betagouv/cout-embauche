import React, { Component } from 'react'
import Summary from '../components/Summary'
import Details from '../components/Details'

export default class Results extends Component {
	render() {
		return (
			<div>
				<Summary />
				<Details />
			</div>
		)
	}
}
