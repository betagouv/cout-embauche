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
import { Percentage } from '../formValueTypes.js'

class Conversation extends Component {
	render() {
		let { form: f, steps, actions} = this.props

		/* C'est ici qu'est définie la suite de questions à poser. */
		return (
			<div id="conversation">
				<Question
					title="Statut Jeune Entreprise Innovante"
					question="Disposez-vous du statut Jeune Entreprise Innovante ?"
					when={true}
					form="jei" formName="jei"
					fields={[ 'resume' ]}
					variableName="jeune_entreprise_innovante"
					choices={[ 'Oui', 'Non' ]}
					valueIfIgnored = "Non"
					serialise={v => v === 'Oui' ? 1 : 0}
					/>
					<Input
						title="Pourcentage d'alternants"
						question="Quel est le pourcentage d'alternants dans votre entreprise ?"
						when={resolve(f, 'jei.resume.value') != undefined}
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
						helpText="Nous permet de calculer le montant de la Contribution Supplémentaire à l'Apprentissage"
					/>

				<Group
					when={steps['pourcentage_alternants']}
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
							when={resolve(f, 'tauxRisqueConnu.resume.value') == 'Oui'}
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
						<Group when={resolve(f, 'tauxRisqueConnu.resume.value') == 'Non'}>
							<Select
								title="Code de risque sélectionné"
								question="Sélectionnez votre code risque dans cette liste"
								form="selectTauxRisque" formName="selectTauxRisque"
								fields={[ 'resume' ]}
								human={v => v.text}
								optionsURL="https://cdn.rawgit.com/laem/taux-collectifs-cotisation-atmp/master/taux-2016.json" />
							<Input
								title="Effectif entreprise"
								question="Quel est l'effectif de votre entreprise ?"
								when={typeof resolve(f, 'selectTauxRisque.resume.value') == 'object'}
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
