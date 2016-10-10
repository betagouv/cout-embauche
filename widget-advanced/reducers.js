import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import { SUBMIT_STEP, EDIT_STEP, UNSUBMIT_ALL} from './actions'
import {
	SIMULATION_UPDATE_REQUEST, SIMULATION_UPDATE_SUCCESS,
	TOGGLE_TOP_SECTION, TOGGLE_ADVANCED_SECTION,
} from './actions'

function steps(state = new Map(), {type, name, ignored}) {
	switch (type) {
	case SUBMIT_STEP:
		return new Map([ ...state ]).set(
			name,
			ignored ? 'ignored' : 'filled'
		)
	case EDIT_STEP:
		return new Map([ ...state ]).set(
			name,
			'editing'
		)
	case UNSUBMIT_ALL:
		return new Map()
	default:
		return state
	}
}

function pending(state = false, action) {
	switch (action.type) {
	case SIMULATION_UPDATE_REQUEST:
		return true
	case SIMULATION_UPDATE_SUCCESS:
		return false
	default:
		return state
	}
}

function results(state = {}, {type, results}) {
	switch (type) {
	case SIMULATION_UPDATE_SUCCESS:
		return results.values
	default:
		return state
	}
}

function activeSections(state = {top: 'input', advanced: true}, {type}) {
	switch (type) {
	// What is the active top section, input or details ?
	case TOGGLE_TOP_SECTION:
		return Object.assign({}, state, {top: state.top === 'input' ? 'details' : 'input' })
		// Is the advanced input active ?
	case TOGGLE_ADVANCED_SECTION:
		return Object.assign({}, state, {advanced: !state.advanced})
	default:
		return state
	}
}

export default combineReducers({
	//  this is handled by redux-form, pas touche !
	form: formReducer,

	/* Have forms been filled or ignored ?
	false means the user is reconsidering its previous input */
	steps,

	// Is an (advanced simulation) request pending ?
	pending,
	results,

	activeSections,
})
