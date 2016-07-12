export const SUBMIT_STEP = 'SUBMIT_STEP'
export function submitStep(formName, variableName, variableValue, transformInputValue, ignored) {
	return {type: SUBMIT_STEP, formName, variableName, variableValue, transformInputValue, ignored}
}

export const EDIT_STEP = 'EDIT_STEP'
export function editStep(formName) {return {type: EDIT_STEP, formName}}

export const UNSUBMIT_ALL = 'UNSUBMIT_ALL'


export const SIMULATION_UPDATE_REQUEST = 'SIMULATION_UPDATE_REQUEST'
export const SIMULATION_UPDATE_SUCCESS = 'SIMULATION_UPDATE_SUCCESS'
export const SIMULATION_UPDATE_FAILURE = 'SIMULATION_UPDATE_FAIL'



export const SIMULATION_REQUEST = 'SIMULATION_REQUEST'
export const SIMULATION_SUCCESS = 'SIMULATION_SUCCESS'
export const SIMULATION_FAILURE = 'SIMULATION_FAIL'

export const TOGGLE_TOP_SECTION = 'TOGGLE_TOP_SECTION'
export const TOGGLE_ADVANCED_SECTION = 'TOGGLE_ADVANCED_SECTION'
export const INITIAL_REQUEST = 'INITIAL_REQUEST'
