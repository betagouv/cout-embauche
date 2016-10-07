import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Question from '../components/Forms/Question'
import Input from '../components/Forms/Input'
import Select from '../components/Forms/Select'
import Group from '../components/Group'
import ResultATMP from '../components/ResultATMP'
import {reduxForm, formValueSelector} from 'redux-form'
import { Percentage } from '../formValueTypes.js'
import questionSet from './conversation-question-set'

let selector = formValueSelector('advancedQuestions'),
	simpleSelector = formValueSelector('basicInput')

let {rework, validate } = questionSet['mutuelle']
console.log(validate(rework('45')))
@reduxForm({
	form: 'advancedQuestions',
	validate: values =>
		Object.keys(values).reduce((result, next) => {
			let value = values[next],
				{rework, validate} = questionSet[next],
				error = validate(rework(value))
			return Object.assign(result, error ? {[next]: error} : null)
		}, {})
	,
})
@connect(state => ({
	formValue: (field, simple) => simple ? simpleSelector(state, field): selector(state, field),
	steps: state.steps,
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch),
}))
class Conversation extends Component {
	render() {
		let { formValue, steps, actions} = this.props

		/* C'est ici qu'est définie la suite de questions à poser. */
		return (
			<div id="conversation">
				<Input
					title="Complémentaire santé"
					question="Quel est le montant total de votre complémentaire santé entreprise obligatoire ?"
					visible="true"
					name="mutuelle" />
				<Input
					title="Pourcentage d'alternants"
					question="Quel est le pourcentage d'alternants dans votre entreprise ?"
					visible={steps.get('mutuelle')}
					name="pourcentage_alternants" />

				<Group
					text="Taux de risque AT/MP"
					visible={steps.get('pourcentage_alternants')}
					steps={steps}
					editStep={actions.editStep}
					foldTrigger="tauxRisque"
					valueType={Percentage}
					answer={formValue('tauxRisque')}
					>
						<Question
							visible={true}
							title="Taux de risque connu"
							question="Connaissez-vous votre taux de risque AT/MP ?"
							name="tauxRisqueConnu" />
						<Input
							title="Taux de risque"
							question="Entrez votre taux de risque"
							visible={formValue('tauxRisqueConnu') == 'Oui'}
							name="tauxRisque" />
						<Group visible={formValue('tauxRisqueConnu')== 'Non'}>
							<Select
								visible={true}
								title="Code de risque sélectionné"
								question="Choisissez la catégorie de risque de votre entreprise"
								name="selectTauxRisque" />
							<ResultATMP
								selectedTauxRisque={formValue('selectTauxRisque')}
								formValue={formValue} {...{steps}}
								effectif={formValue('effectifEntreprise', 'basicInput')} />
						</Group>
					</Group>

					<Question
						title="Statut Jeune Entreprise Innovante"
						question="Profitez-vous du statut Jeune Entreprise Innovante pour cette embauche ?"
						visible={steps.get('tauxRisque')}
						name="jei" />
		</div>)
	}
}

export default Conversation
