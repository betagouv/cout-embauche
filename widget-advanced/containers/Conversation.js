import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import resolve from '../../utils/resolve'
import Question from '../components/Forms/Question'
import Input from '../components/Forms/Input'
import Select from '../components/Forms/Select'
import Group from '../components/Group'
import ResultATMP from '../components/ResultATMP'
import { Percentage, Euro } from '../formValueTypes.js'
import {reduxForm, formValueSelector} from 'redux-form'

let selector = formValueSelector('advancedQuestions'),
	 simpleSelector = formValueSelector('basicInput')

@reduxForm({form: 'advancedQuestions'})
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
					name="mutuelle"
					attributes={{
						type: 'number',
						step: 'any',
						placeholder: 'par ex. 30',
					}}
					valueType={Euro}
					valueIfIgnored = "30"
					helpText={`L'employeur a l'obligation en 2016 de proposer et financer à 50% une offre
										de complémentaire santé. Son montant est libre, tant qu'elle couvre un panier légal de soins.`} />

					<Input
						title="Pourcentage d'alternants"
						question="Quel est le pourcentage d'alternants dans votre entreprise ?"
						visible={steps.get('mutuelle')}
						name="pourcentage_alternants"
						attributes={{
							type: 'number',
							step: 'any',
							min: '0',
							max: '100',
						}}
						valueType={Percentage}
						valueIfIgnored = "0"
						helpText="Ce pourcentage nous permet de calculer le montant de la Contribution Supplémentaire à l'Apprentissage"
					/>

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
							name="tauxRisqueConnu"
							choices={[ 'Oui', 'Non' ]}
							helpText="Cotisation accidents du travail (AT) et maladies professionnelles (MP). Son taux est accessible sur net-entreprises.fr"/>
						<Input
							title="Taux de risque"
							question="Entrez votre taux de risque"
							visible={formValue('tauxRisqueConnu') == 'Oui'}
							name="tauxRisque"
							attributes={{
								type: 'number',
								step: 'any',
								min: '0',
								max: '200',
								placeholder: '1.1',
							}}
							valueType={Percentage} />
						<Group visible={formValue('tauxRisqueConnu')== 'Non'}>
						<Select
							visible={true}
							title="Code de risque sélectionné"
							question="Choisissez la catégorie de risque de votre entreprise"
							name="selectTauxRisque"
							fields={[ 'resume' ]}
							human={v => v.text}
							optionsURL="https://cdn.rawgit.com/laem/taux-collectifs-cotisation-atmp/master/taux-2016.json" />

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
						name="jei"
						choices={[ 'Oui', 'Non' ]}
						valueIfIgnored = "Non"
						helpText={'Votre entreprise doit être éligible à ce statut, et votre employé doit avoir une fonction de recherche et développement. En savoir plus : https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188'} />
		</div>)
	}
}

export default Conversation
