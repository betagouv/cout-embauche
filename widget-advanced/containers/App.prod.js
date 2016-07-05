import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Conversation  from '../containers/Conversation'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'
import './advanced-questions.css'

export default class App extends Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<Conversation />
			</Provider>
		)
	}
}
