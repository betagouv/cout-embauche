import React, {Component} from 'react'

import Introduction from '../components/Introduction'
import Conversation from '../containers/Conversation'
import { Provider } from 'react-redux'

import './forms.css'
import './app.css'

export default class App extends Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<div>
					<Introduction />
					<Conversation delay="200" />
				</div>
			</Provider>
		)
	}
}
