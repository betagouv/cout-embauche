import React, { Component } from 'react'
export default class ErrorZone extends Component {
	render() {
		return (
			<div style={{border: '1px solid orange'}}>InfoZone
				<div className="errors">Errors</div>
				<div className="info">Info</div>
			</div>
		)
	}
}
