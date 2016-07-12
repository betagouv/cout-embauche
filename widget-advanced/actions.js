// The input "conversation" is composed of "steps"
// The state keeps track of which of them have been submitted
export const SUBMIT_STEP = 'SUBMIT_STEP'
export function submitStep(name, ignored) {
	return {type: SUBMIT_STEP, name, ignored}
}

// The user can also come back to one of his answers and edit it
export const EDIT_STEP = 'EDIT_STEP'
export function editStep(name) {return {type: EDIT_STEP, name}}

// Reset the form
export const UNSUBMIT_ALL = 'UNSUBMIT_ALL'


// Collect the input information from the forms, send them to the simulation engine API
// then update the results in the UI
export const SIMULATION_UPDATE_REQUEST = 'SIMULATION_UPDATE_REQUEST'
export const SIMULATION_UPDATE_SUCCESS = 'SIMULATION_UPDATE_SUCCESS'
export const SIMULATION_UPDATE_FAILURE = 'SIMULATION_UPDATE_FAIL'

// Modify the UI parts displayed to the user
export const TOGGLE_TOP_SECTION = 'TOGGLE_TOP_SECTION'
export const TOGGLE_ADVANCED_SECTION = 'TOGGLE_ADVANCED_SECTION'

// The initial request triggers the display of results based on default input information (not filled by the user)
export const INITIAL_REQUEST = 'INITIAL_REQUEST'
