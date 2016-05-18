import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import App from './containers/App'
import todoApp from './reducers'
import DevTools from './DevTools'
import { AppContainer } from 'react-hot-loader'

const createFinalStore = compose(
	// Enables your middleware:
	applyMiddleware(), // any Redux middleware, e.g. redux-thunk
	// Provides support for DevTools:
	DevTools.instrument(),
)(createStore)

const store = createFinalStore(todoApp)

const anchor = (anchor) => {
	render(
		<AppContainer>
			<App store={store}/>
		</AppContainer>,
		anchor
	)

	if (module.hot) {
		module.hot.accept('./containers/App', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
			const NextApp = require('./containers/App').default
			render(
				<AppContainer>
					<NextApp store={store} />
				</AppContainer>,
				anchor
			)
		})
	}
}

export {anchor}
