import { takeEvery, delay } from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import {inputData} from './data/inputData'
import outputVariables from './data/outputVariables.yaml'
import {INITIAL_REQUEST} from './actions'

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

// Pure requêteur pour OpenFisca, ne dépend pas de l'UI
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

function* handleFormChange() {
	try {
		let
			basicValues = yield select(state => state.form.basicInput.values),
			advancedValues = yield select(state => state.form.advancedQuestions && state.form.advancedQuestions.values),
			inputValues = Object.assign({}, basicValues, advancedValues),
			transformedValues = Object.keys(inputData).reduce((final, name) => {
				let data = inputData[name],
					userValue = inputValues[Object.keys(inputValues).find(k => k == name)]

				if (typeof data == 'string')
					return Object.assign(final, {[name]: data})

				if (userValue == null) return final

				if (typeof data === 'function')
					return Object.assign(final, data(userValue))

				// data is an Array and the function is the second element
				return Object.assign(final, data[1](userValue))
			}, {})

		let	results = yield call(request, transformedValues)
		yield put({type: 'SIMULATION_SUCCESS', results})
	} catch (e) {
		console.log('ARGHH', e)
	}

}

function* watchFormChanges() {
	yield* takeEvery([ INITIAL_REQUEST, 'redux-form/CHANGE' ], handleFormChange)
}

export default function* rootSaga() {
	yield [ watchFormChanges() ]
}
