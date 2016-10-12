import React, {Component} from 'react'

export default DecoratedComponent => {
	return class extends Component {
		// state: {
		// 	hover: false
		// }
		// toggleHover() {
		// 	this.setState({hover: !this.state.hover})
		// }
		render() {
			// let style = {background: this.state.hover ? 'blue' : 'orange'}
			return (
				<img src="http://www.w3schools.com/css/trolltunga.jpg" />
			)
		}
	}
}
