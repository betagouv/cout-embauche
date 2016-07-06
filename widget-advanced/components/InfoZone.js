import React, { Component } from 'react'
export default class ErrorZone extends Component {
	render() {
		return (
			<div style={{border: '1px solid orange'}}>InfoZone:
				<div style={{display: 'inline'}} className="errors"> Errors</div>
				<div style={{display: 'inline'}} className="info">, Info</div>
			</div>
		)
	}
}
