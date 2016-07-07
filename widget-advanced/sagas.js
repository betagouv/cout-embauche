import { takeEvery} from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import {basicInputData} from './data/basicInputValues'
import outputVariables from './data/outputVariables.yaml'

// Promisify the API call to handled by saga's call Effect
let updateSimulation = (variableName, variableValue) =>
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


let serializeObject = source =>
	Object.keys(source)
		.map(key => encodeURI(key + '=' + source[key]))
		.join('&')

let baseUrl =
	'https://embauche.beta.gouv.fr/openfisca/api/2/formula/' +
	Object.keys(outputVariables)
		.reduce((final, category) =>
			[ // Turn the yaml object into a flat array
				...final,
				...outputVariables[category].filter(i => !i.notCalculated).map(i => i.key),
			], [])
		.join('+')

function request(input) {

	let
		url = baseUrl + '?' + serializeObject(input),
		headers = input['salaire_net_a_payer'] ? {
			'x-OpenFisca-Extensions': 'de_net_a_brut',
		} : {}

	return new Promise( (resolve, reject) =>
		fetch(url, {headers})
			.then(response => {
				if (!response.ok) {
					const error = new Error(response.statusText)
					error.response = response
					reject(error)
				}
				return response.json()
			})
			.then(json => resolve(json.values))
			.catch(reject)
		)
}



function* handleFormChange({meta: {field, form}, payload}) {
	try {
		let
			basicInputValues = yield select(state => state.form.basicInput.values),
			transformedValues = Object.keys(basicInputData).reduce((final, name) => {
				let data = basicInputData[name],
					userValue = basicInputValues[Object.keys(basicInputValues).find(k => k == name)],
					transformed = typeof data != 'string' ? data[1](userValue) : {[name]: data}

				return Object.assign(final, transformed)
			}, {}),
			results = yield call(request, transformedValues)
		console.log('yo', results)
		yield put({type: 'SIMULATION_SUCCESS', results})
	} catch (e) {
		console.log('ARGHH', e)
	}

}

function* watchFormChanges() {
	yield* takeEvery('redux-form/CHANGE', handleFormChange)
}

export default function* rootSaga() {
	yield [ watchSteps(), watchFormChanges() ]
}
