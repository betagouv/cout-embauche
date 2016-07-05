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

class Conversation extends Component {
	render() {
		let { form: f, steps, actions} = this.props

		/* C'est ici qu'est définie la suite de questions à poser. */
		return (
			<div id="conversation">
				<Input
					title="Complémentaire santé"
					question="Quel est le montant total de votre complémentaire santé entreprise obligatoire ?"
					visible="true"
					form="mutuelle" formName="mutuelle"
					fields={[ 'resume' ]}
					variableName="complementaire_sante_montant"
					attributes={{
						type: 'number',
						step: 'any',
						placeholder: 'par ex. 30',
					}}
					valueType={Euro}
					valueIfIgnored = "30"
					helpText={`L'employeur a l'obligation en 2016 de proposer et financer à 50% une offre
										de complémentaire santé. Son montant est libre, tant qu'elle couvre un panier légal de soins.`} />

				<Question
					title="Statut Jeune Entreprise Innovante"
					question="Profitez-vous du statut Jeune Entreprise Innovante ?"
					visible={steps['mutuelle']}
					form="jei" formName="jei"
					fields={[ 'resume' ]}
					variableName="jeune_entreprise_innovante"
					choices={[ 'Oui', 'Non' ]}
					valueIfIgnored = "Non"
					serialise={v => v === 'Oui' ? 1 : 0}
					helpText={'Votre entreprise doit pouvoir bénéficier de ce statut, et votre employé doit avoir une fonction de recherche et développement. En savoir plus : https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188'} />

					<Input
						title="Pourcentage d'alternants"
						question="Quel est le pourcentage d'alternants dans votre entreprise ?"
						visible={resolve(f, 'jei.resume.value') != undefined}
						form="pourcentage_alternants" formName="pourcentage_alternants"
						fields={[ 'resume' ]}
						variableName="ratio_alternants"
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
					visible={steps['pourcentage_alternants']}
					text="Taux de risque AT/MP"
					steps={steps}
					unsubmitStep={actions.unsubmitStep}
					foldTrigger="tauxRisque"
					valueType={Percentage}
					answer={resolve(f, 'tauxRisque.resume.value')}
					>
						<Question
							title="Taux de risque connu"
							question="Connaissez-vous votre taux de risque AT/MP ?"
							form="tauxRisqueConnu" formName="tauxRisqueConnu"
							fields={[ 'resume' ]}
							choices={[ 'Oui', 'Non' ]}
							helpText="Cotisation accidents du travail (AT) et maladies professionnelles (MP). Son taux est accessible sur net-entreprises.fr"/>
						<Input
							title="Taux de risque"
							question="Entrez votre taux de risque"
							visible={resolve(f, 'tauxRisqueConnu.resume.value') == 'Oui'}
							form="tauxRisque" formName="tauxRisque"
							fields={[ 'resume' ]}
							variableName="taux_accident_travail"
							attributes={{
								type: 'number',
								step: 'any',
								min: '0',
								max: '200',
								placeholder: '1.1',
							}}
							valueType={Percentage} />
						<Group visible={resolve(f, 'tauxRisqueConnu.resume.value') == 'Non'}>
							<Select
								title="Code de risque sélectionné"
								question="Choisissez la catégorie de risque de votre entreprise"
								form="selectTauxRisque" formName="selectTauxRisque"
								fields={[ 'resume' ]}
								human={v => v.text}
								optionsURL="https://cdn.rawgit.com/laem/taux-collectifs-cotisation-atmp/master/taux-2016.json" />
							<Input
								title="Effectif entreprise"
								question="Quel est l'effectif de votre entreprise ?"
								visible={typeof resolve(f, 'selectTauxRisque.resume.value') == 'object'}
								form="effectif" formName="effectif"
								fields={[ 'resume' ]}
								attributes={{
									type: 'number',
									step: '1',
									min: '0',
									placeholder: '29',
								}} />
							<ResultATMP f={f} {...{steps}}/>
						</Group>
					</Group>


		</div>)
	}
}

const selectActions = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

export default connect(state => state, selectActions)(Conversation)
