import { takeLatest } from 'redux-saga'
import { call, put, select} from 'redux-saga/effects'
import Promise from 'core-js/fn/promise'
import steps from './conversation-steps'
import {INITIAL_REQUEST, SIMULATION_UPDATE_SUCCESS, SUBMIT_STEP} from './actions'
import {request} from './openfisca'
import validate from './conversation-validate'
import {change} from 'redux-form'
let CHANGE = change().type

let sessionId = Math.floor(Math.random() * 1000000000000)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleFormChange() {

	/* debounce by 500ms : don't make 10 network requests if the user changes
	the salary incrementally from 3000 to 3010 */
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

		/* 	The simulation is made with the basic and avanced input values
				But if the user input is unset yet or invalid, use the default step value
		*/
		let defaultAdvancedValues =
			Object.keys(steps).reduce((final, name) => {
				let {defaultValue} = steps[name]
				return (
					defaultValue && (advancedValues[name] == null || validationErrors[name])
				) ?	{...final, [name]: defaultValue}
						: final
			}, {}),
			inputValues = Object.assign({},
				basicValues,
				advancedValues,
				defaultAdvancedValues
			),
			// Transform the raw input data to a new one tailored for the simulation API
			transformedValues = Object.keys(steps).reduce((final, name) => {
				let step = steps[name],
					userValue = inputValues[name]

				let {adapt, valueType = {}, validator} = step

				if (!adapt)
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
		console.log('ARGHH, erreur dans la requête de calcul des cotisations', e) // eslint-disable-line no-console
	}

}

function* handleSatisfaction({type, name, meta}) {
	let
		satisfaction = type == CHANGE && meta.field == 'serviceUtile',
		message = type == SUBMIT_STEP && name == 'remarque'

	if (! (satisfaction || message)) return

	try {
		let {remarque, serviceUtile} =
				yield	select(state => state.form.advancedQuestions.values)

		let body = {
			'fields': {
				'satisfait': message ? 'remarque' : serviceUtile,
				'message': message ? remarque : '',
				'date': new Date().toISOString(),
				'id': sessionId + ''
			}
		}
		yield call((body) =>
			fetch('https://api.airtable.com/v0/appihuPtw4TUIR0Y3/retours', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer keyUq4AzhJSweQaGB',
					'Content-type': 'application/json'
				},
				body: JSON.stringify(body)
			}), body)
	} catch (e) {
		console.log('ARGHH, erreur dans l\'envoi de la satisfaction utilisateur', e) // eslint-disable-line no-console
	}


}

function* watchFormChanges() {
	yield takeLatest([ INITIAL_REQUEST, CHANGE ], handleFormChange)
}


function* watchStepSubmit() {
	yield takeLatest([ SUBMIT_STEP, CHANGE ], handleSatisfaction)
}


export default function* rootSaga() {
	yield [ watchFormChanges(), watchStepSubmit() ]
}
