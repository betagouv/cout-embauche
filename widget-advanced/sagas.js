import { takeEvery} from 'redux-saga'
//import { take } from 'redux-saga/effects'


function* handleSubmitStep() {
	console.log('SALUT')
}

function* watchSteps() {
	yield* takeEvery('SUBMIT_STEP', handleSubmitStep)
}

export default function* rootSaga() {
	yield [ watchSteps() ]
}
