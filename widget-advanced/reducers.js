import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import { SUBMIT_STEP, UNSUBMIT_STEP } from './actions'
import { SIMULATION_UPDATE_REQUEST, SIMULATION_UPDATE_SUCCESS } from './actions'

function submitted(state = {}, action) {
	switch (action.type) {
	case SUBMIT_STEP:
		return Object.assign({}, state, {
			[action.formName]: true,
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

export default combineReducers({
	//  this is handled by redux-form, pas touche !
	form: formReducer,

	/* which forms have been submitted ?
	false can mean the user is reconsidering its previous input */
	submitted,

	// Is an (advanced simulation) request pending ?
	pending,
})
