import './reset.css'
import './main.css'
import './containers/advanced-questions.css'
import './colour-chooser.css'


import 'core-js/fn/promise'

import React from 'react'
import { render } from 'react-dom'
import {connect, Provider} from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import {changeThemeColour} from './actions'
import Widget from './containers/Widget'
import { SliderPicker } from 'react-color'

let sagaMiddleware = createSagaMiddleware()

let createFinalStore = compose(
	applyMiddleware(sagaMiddleware)
)(createStore)


let store = createFinalStore(reducers)
sagaMiddleware.run(rootSaga)

@connect(state => ({couleur: state.themeColours.colour}),
	dispatch => ({
		changeColour: colour => dispatch(changeThemeColour(colour))
	}))
class MyComponent extends React.Component {

	changeColour = ({hex}) => this.props.changeColour(hex)
	render() {
		return (
			<div>
				<p className="indication">
					Visualisez sur cette page l'apparence du module pour différentes couleurs principales.
				</p>
				<SliderPicker
					color={this.props.couleur}
					onChangeComplete={this.changeColour}
					/>
				<p className="indication">
					La couleur sélectionnée, à déclarer comme attribut "data-couleur" du script sur votre page est : <b>{this.props.couleur}</b>
				</p>
				<Widget />
			</div>)
	}
}

render(
	<Provider store={store}>
		<MyComponent />
	</Provider>,
	document.querySelector('.SGMAPembauche')
)
