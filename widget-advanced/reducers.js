import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import { SUBMIT_STEP, UNSUBMIT_STEP } from './actions'
import { SIMULATION_UPDATE_REQUEST, SIMULATION_UPDATE_SUCCESS } from './actions'
import { SIMULATION_SUCCESS, TOGGLE_SECTION } from './actions'

function steps(state = {}, action) {
	switch (action.type) {
	case SUBMIT_STEP:
		return Object.assign({}, state, {
			[action.formName]: action.ignored ? 'ignored' : 'filled',
		})
	case UNSUBMIT_STEP:
		return Object.assign({}, state, {
			[action.formName]: false,
		})
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
	case SIMULATION_SUCCESS:
		return results
	default:
		return state
	}
}

function activeSection(state = 'input', {type}) {
	switch (type) {
	case TOGGLE_SECTION:
		return state === 'input' ? 'details' : 'input'
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
	activeSection,
	// advancedInput,
})
