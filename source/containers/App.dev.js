import React, { Component } from 'react'
import { Provider } from 'react-redux'
import DevTools  from '../DevTools'
import Widget  from '../containers/Widget'

import './advanced-questions.css'

export default class App extends Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<div>
					<Widget />
					<DevTools />
				</div>
			</Provider>
		)
	}
}
