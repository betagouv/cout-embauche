import React, {Component} from 'react'

import Conversation from '../containers/Conversation'
import { Provider } from 'react-redux'
import DevTools from '../DevTools'

import './forms.css'
import './app.css'

export default class App extends Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<div>
					<Conversation />
					<DevTools />
				</div>
			</Provider>
		)
	}
}
