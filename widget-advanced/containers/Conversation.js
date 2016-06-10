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
import Introduction from '../components/Introduction'


/*
	C'est ici qu'est définie la suite de questions à poser.
*/
class Conversation extends Component {
	state = { hidden: true }

	/* Display <Introduction> a bit before this component */
	componentDidMount = () => setTimeout(() => this.setState({hidden: false}), this.props.delay)

	render() {
		if (this.state.hidden) return null
		let { form: f, submitted, pending, actions} = this.props

		return (
			<div id="conversation">
				<Introduction {... {pending}} />
				<Question
					title="Statut Jeune Entreprise Innovante"
					question="Disposez-vous du statut Jeune Entreprise Innovante ?"
					when={true}
					form="jei" formName="jei"
					fields={[ 'resume' ]}
					variableName="jeune_entreprise_innovante"
					possibleChoices ={{
						'1': 'Oui',
						'0': 'Non',
					}}
					/>
					<Input
						title="Pourcentage d'alternants"
						question="Quel est le pourcentage d'alternants dans votre entreprise ?"
						when={resolve(f, 'jei.resume.value') != undefined}
						form="pourcentage_alternants" formName="pourcentage_alternants"
						fields={[ 'resume' ]}
						variableName="ratio_alternants"
						transformInputValue={v => v/100}
						attributes={{
							type: 'number',
							step: 'any',
							min: '0',
							max: '100',
						}}
						answerSuffix="%"
						helpText="Nous permet de calculer le montant de la Contribution Supplémentaire à l'Apprentissage"
					/>

				<Group
					when={submitted['pourcentage_alternants']}
					text="Taux de risque AT/MP"
					submitted={submitted}
					unsubmitStep={actions.unsubmitStep}
					foldTrigger='tauxRisque'
					answer={resolve(f, 'tauxRisque.resume.value')}
					answerSuffix="%" >
						<Question
							title="Taux de risque connu"
							question="Connaissez-vous votre taux de risque AT/MP ?"
							form="tauxRisqueConnu" formName="tauxRisqueConnu"
							fields={[ 'resume' ]}
							possibleChoices ={{
								oui: 'Oui',
								non: 'Non',
							}}
							helpText="Cotisation accidents du travail (AT) et maladies professionnelles (MP). Son taux est accessible sur net-entreprises.fr"/>
						<Input
							title="Taux de risque"
							question="Entrez votre taux de risque"
							when={resolve(f, 'tauxRisqueConnu.resume.value') == 'oui'}
							form="tauxRisque" formName="tauxRisque"
							fields={[ 'resume' ]}
							attributes={{
								type: 'number',
								step: 'any',
								min: '0',
								max: '200',
								placeholder: '1.1',
							}}
							answerSuffix="%" />
						<Group when={resolve(f, 'tauxRisqueConnu.resume.value') == 'non'}>
							<Select
								title="Code de risque sélectionné"
								question="Sélectionnez votre code risque dans cette liste"
								form="selectTauxRisque" formName="selectTauxRisque"
								fields={[ 'resume' ]}
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
							<ResultATMP f={f} submitted={submitted}/>
						</Group>
					</Group>


		</div>)
	}
}

const selectActions = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

export default connect(state => state, selectActions)(Conversation)
