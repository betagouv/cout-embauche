import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Question from '../components/Forms/Question'
import Input from '../components/Forms/Input'
import SelectCommune from '../components/Forms/SelectCommune'
import SelectTauxRisque from '../components/Forms/SelectTauxRisque'
import RhetoricalQuestion from '../components/Forms/RhetoricalQuestion'
import TextArea from '../components/Forms/TextArea'
import Group from '../components/Group'
import ResultATMP from '../components/ResultATMP'
import {reduxForm, formValueSelector} from 'redux-form'
import { percentage } from '../formValueTypes.js'
import validate from '../conversation-validate'
import {themeColour, textColour} from '../themeColours'

let advancedInputSelector = formValueSelector('advancedQuestions'),
	basicInputSelector = formValueSelector('basicInput')

@reduxForm({
	form: 'advancedQuestions',
	validate,
})
@connect(state => ({
	formValue: (field, simple) => simple ? basicInputSelector(state, field): advancedInputSelector(state, field),
	steps: state.steps,
}))
class Conversation extends Component {
	render() {
		let { formValue, steps} = this.props
		let effectifEntreprise = formValue('effectifEntreprise', 'basicInput')

		/* C'est ici qu'est définie la suite de questions à poser. */
		return (
			<div id="conversation">
				<SelectCommune
					visible={effectifEntreprise > 10}
					title="Commune"
					question="Quelle est la commune de l'embauche ?"
					name="codeINSEE" />
				<Input
					title="Complémentaire santé"
					question="Quel est le montant total par salarié de votre complémentaire santé entreprise obligatoire ?"
					visible={effectifEntreprise <= 10 || steps.get('codeINSEE')}
					name="mutuelle" />

				<Group
					text="Taux de risque AT/MP"
					visible={steps.get('mutuelle')}
					foldTrigger="tauxRisque"
					valueType={percentage}
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
						<Group name="tauxInconnu" visible={formValue('tauxRisqueConnu')== 'Non'}>
							<SelectTauxRisque
								visible={true}
								title="Code de risque sélectionné"
								question="Quelle est la catégorie de risque de votre entreprise ?"
								name="selectTauxRisque" />
							<ResultATMP
								name="resultATMP"
								selectedTauxRisque={formValue('selectTauxRisque')}
								formValue={formValue}
								{...{steps}}
								effectif={formValue('effectifEntreprise', 'basicInput')} />
						</Group>
				</Group>

				<Input
					title="Pourcentage d'alternants"
					question="Quel est le pourcentage d'alternants dans votre entreprise ?"
					visible={steps.get('tauxRisque')}
					name="pourcentage_alternants" />

				<Question
					title="Exonération Jeune Entreprise Innovante"
					question="Profitez-vous du statut Jeune Entreprise Innovante pour cette embauche ?"
					visible={steps.get('pourcentage_alternants')}
					name="jei" />

				<Question
					title="Votre avis"
					question="Votre estimation est terminée. En êtes-vous satisfait ?"
					visible={steps.get('jei')}
					name="serviceUtile" />
				<RhetoricalQuestion
					visible={formValue('serviceUtile') === ':-)'}
					name="partage"
					question={<span>
						N'hésitez pas à partager le simulateur !
						<br/>
						<span id="share-link" style={{color: textColour, background: themeColour}}>{window.location.href}</span>
					</span>
					} />
				<TextArea
					visible={formValue('serviceUtile') === ':-|'}
					name="remarque"
					title="Votre remarque"
					question={'Que pouvons-nous faire pour l\'améliorer ?'}
					/>
		</div>)
	}
}

export default Conversation
