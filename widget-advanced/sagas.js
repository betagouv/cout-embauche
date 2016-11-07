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

	try {

		let
			basicValues = yield select(state => state.form.basicInput.values),
			advancedValues =
				yield	select(state =>
					(state.form.advancedQuestions && state.form.advancedQuestions.values) || {}
				),
			validationErrors = validate(advancedValues)
		// there is a form validation error -> do not update
		if (Object.keys(validationErrors).length)
			return


		// valid advanced answers -> make the simulation with these answers.
		// Else use default values !
		Object.keys(steps).reduce((final, name) => {
			let {defaultValue} = steps[name]
			if (defaultValue && (advancedValues[name] == null || validationErrors[name]))
				advancedValues[name] = defaultValue
		})

		let
			inputValues = Object.assign({},
				basicValues,
				advancedValues,
			),
			// Transform the raw input data to a new one tailored for the simulation API
			transformedValues = Object.keys(steps).reduce((final, name) => {
				let step = steps[name],
					userValue = inputValues[name]

				let {adapt, valueType = {}, validator} = step
				if (userValue == null || !adapt)
					return final

				let
					{pre = v => v} = Object.assign({}, validator, valueType.validator)

				return Object.assign(final, adapt(userValue, pre(userValue), inputValues))
			}, {}),

			results = yield call(request, transformedValues)
		// Used by the js API in openfisca.js
		window.Embauche.OpenFisca.input = transformedValues

		yield put({type: SIMULATION_UPDATE_SUCCESS, results})

	} catch (e) {
		console.log('ARGHH, erreur dans la requête à l\'API', e)
	}

}

function* watchFormChanges() {
	yield takeLatest([ INITIAL_REQUEST, 'redux-form/CHANGE' ], handleFormChange)
}

export default function* rootSaga() {
	yield [ watchFormChanges() ]
}
