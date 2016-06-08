import { takeEvery} from 'redux-saga'
import { call, put} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'

// Promisify the API call to handled by saga's call Effect
const updateSimulation = (variableName, variableValue) =>
	new Promise( (resolve, reject) =>
		window.Embauche.OpenFisca.get(
			{[variableName]: variableValue},
			(error, output) => {
				error ? reject(error) : resolve(output)
			}))


function* handleSubmitStep({variableName, variableValue}) {
	if (variableName != null) { // there is a need for an API request
		try {
			yield put({type: 'SIMULATION_UPDATE_REQUEST'})
			const output = yield call(updateSimulation, variableName, variableValue)
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

export default function* rootSaga() {
	yield [ watchSteps() ]
}
