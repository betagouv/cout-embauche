import { takeLatest } from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import steps from './conversation-steps'
import {INITIAL_REQUEST, SIMULATION_UPDATE_SUCCESS} from './actions'
import {request} from './openfisca'
import validate from './conversation-validate'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleFormChange() {

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
			// Transform the raw input data to a new one tailored for the simulation API
			transformedValues = Object.keys(steps).reduce((final, name) => {
				let step = steps[name],
					userValue = inputValues[name]

				let {adapt, valueType, validator} = step
				if (userValue == null || !adapt)
					return final

				let	pre1 = validator && validator.pre,
					type = valueType && new valueType(),
					pre2 = console.log('yoyo', type) || type && type.validator.pre,
					pre = pre1 || pre2 || (v => v)

				return Object.assign(final, adapt(userValue, pre(userValue), inputValues))
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
