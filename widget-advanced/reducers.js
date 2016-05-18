import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import { SUBMIT_STEP, UNSUBMIT_STEP } from './actions'

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

const todoApp = combineReducers({
	//  this is handled by redux-form, pas touche !
	form: formReducer,

	/* which forms have been submitted ?
	Submitted: false can mean the user is reconsidering its previous input */
	submitted,
})

export default todoApp
