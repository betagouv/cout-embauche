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

/*
	C'est ici qu'est définie la suite de questions à poser.
*/
class Conversation extends Component {
	state = { hidden: true }
	componentDidMount = () => setTimeout(() => this.setState({hidden: false}), this.props.delay)
	render() {
		if (this.state.hidden) return null
		let { form: f, submitted} = this.props
		return (
			<div id="conversation">
				<Question
					title="Jeune Entreprise Innovante"
					question="Disposez -vous du statut Jeune Entreprise Innovante ?"
					when={true}
					form="jei" formName="jei"
					fields={[ 'resume' ]}
					possibleChoices ={[
						{value: 'oui', text: 'Oui' },
						{value: 'non', text: 'Non' },
					]}/>

				<Input
					title="% alternants"
					question="Quel est le pourcentage d'alternants dans votre entreprise ?"
					when={resolve(f, 'jei.resume.value') != undefined}
					form="pourcentage_alternants" formName="pourcentage_alternants"
					fields={[ 'resume' ]}
					attributes={{
						type: 'number',
						step: 'any',
						min: '0',
						max: '100',
					}}
					unit="%"
					helpText="Cette information permet de calculer le montant de la Contribution Supplémentaire à l'Apprentissage"
				/>

			<Group name="AT / MP" when={submitted['pourcentage_alternants']}>
					<Question
						title="Taux de risque connu"
						question="Connaissez-vous votre taux de risque AT/MP ?"
						form="tauxRisqueConnu" formName="tauxRisqueConnu"
						fields={[ 'resume' ]}
						possibleChoices ={[
							{value: 'oui', text: 'Oui' },
							{value: 'non', text: 'Non' },
						]}
						helpText="La cotisation d’accidents du travail (AT) et maladies professionnelles (MP). Son taux est accessible sur net-entreprises.fr"/>
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
						unit="%" />
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
