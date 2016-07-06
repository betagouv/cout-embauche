import { takeEvery} from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import {basicInputData} from './containers/basicInputValues'

// Promisify the API call to handled by saga's call Effect
const updateSimulation = (variableName, variableValue) =>
	new Promise( (resolve, reject) =>
		window.Embauche.OpenFisca.get(
			{[variableName]: variableValue},
			(error, output) => {
				error ? reject(error) : resolve(output)
			}))


function* handleSubmitStep({variableName, variableValue, transformInputValue}) {
	if (variableName != null) { // there is a need for an API request
		try {
			yield put({type: 'SIMULATION_UPDATE_REQUEST'})
			/* The value can be transformed before being sent online,
			e.g. to transform a percentage to a ratio */
			let v2 = transformInputValue ? transformInputValue(variableValue) : variableValue
			const output = yield call(updateSimulation, variableName, v2)
			console.log('API call output', output)
			yield put({type: 'SIMULATION_UPDATE_SUCCESS'})
			yield call(window.Embauche.updateSimulationResults, output)
		} catch (e) {
			console.log('ARG', e)
		}
	}
}

function* watchSteps() {
	yield* takeEvery('SUBMIT_STEP', handleSubmitStep)
}

function* handleFormChange({meta: {field, form}, payload}) {
	let
		basicInputValues = yield select(state => state.form.basicInput.values),
		transformedValues = Object.keys(basicInputData).reduce((final, name) => {
			let data = basicInputData[name],
				userValue = basicInputValues[Object.keys(basicInputValues).find(k => k == name)],
				transformed = typeof data != 'string' ? data[1](userValue) : {[name]: data}

			return Object.assign(final, transformed)
		}, {})
		console.log('basicInputState', basicInputValues, transformedValues)



}

function* watchFormChanges() {
	yield* takeEvery('redux-form/CHANGE', handleFormChange)
}

export default function* rootSaga() {
	yield [ watchSteps(), watchFormChanges() ]
}
