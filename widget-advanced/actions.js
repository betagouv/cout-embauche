export const SUBMIT_STEP = 'SUBMIT_STEP'
export const UNSUBMIT_STEP = 'UNSUBMIT_STEP'

export function submitStep(formName, variableName, variableValue, transformInputValue, ignored) {
	return {type: SUBMIT_STEP, formName, variableName, variableValue, transformInputValue, ignored}
}
export function unsubmitStep(formName) {return {type: UNSUBMIT_STEP, formName}}


export const SIMULATION_UPDATE_REQUEST = 'SIMULATION_UPDATE_REQUEST'
export const SIMULATION_UPDATE_SUCCESS = 'SIMULATION_UPDATE_SUCCESS'
export const SIMULATION_UPDATE_FAILURE = 'SIMULATION_UPDATE_FAIL'



export const SIMULATION_REQUEST = 'SIMULATION_REQUEST'
export const SIMULATION_SUCCESS = 'SIMULATION_SUCCESS'
export const SIMULATION_FAILURE = 'SIMULATION_FAIL'
