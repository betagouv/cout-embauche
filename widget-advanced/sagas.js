import { takeLatest } from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import {inputData} from './data/inputData'
import {INITIAL_REQUEST, SIMULATION_UPDATE_SUCCESS} from './actions'
import {request} from './openfisca'
import validate from './containers/conversation-validate'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleFormChange(action) {
	// it is just an intermediary field used to input a codeINSEE, does not need an update
	if (action.type === 'redux-form/CHANGE' && action.meta.field == 'codePostal')
		return

	// debounce by 500ms
	yield call(delay, 500)

	let
		basicValues = yield select(state => state.form.basicInput.values),
		advancedValues = yield select(state => state.form.advancedQuestions && state.form.advancedQuestions.values)

	// there is a form validation error -> do not update
	if (advancedValues && Object.keys(validate(advancedValues)).length)
		return


	try {
		let
			inputValues = Object.assign({},
				basicValues,
				advancedValues,
			),
			// Transform the raw input object to a new one tailored for the simulation API
			// 'inputData' provides this correspondance
			transformedValues = Object.keys(inputData).reduce((final, name) => {
				let transformer = inputData[name],
					userValue = inputValues[name]

				if (typeof transformer == 'string') // well not really a transformer then !
					return Object.assign(final, {[name]: transformer})

				if (userValue == null) return final // ignore !

				if (typeof transformer === 'function')
					return Object.assign(final, transformer(userValue, inputValues))

				// else transformer is an Array and the function is the second element
				return Object.assign(final, transformer[1](userValue, inputValues))
			}, {}),

			results = yield call(request, transformedValues)
		// Used by the js API in openfisca.js
		window.Embauche.OpenFisca.input = transformedValues

		yield put({type: SIMULATION_UPDATE_SUCCESS, results})

	} catch (e) {
		console.log('ARGHH', e)
	}

}

function* watchFormChanges() {
	yield takeLatest([ INITIAL_REQUEST, 'redux-form/CHANGE' ], handleFormChange)
}

export default function* rootSaga() {
	yield [ watchFormChanges() ]
}
