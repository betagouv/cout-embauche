import React, { Component } from 'react'
import resolve from '../../utils/resolve'
import RhetoricalQuestion from './Forms/RhetoricalQuestion'

class ResultATMP extends Component {
	render() {
		let {
			f,
			steps,
			effectif = resolve(f, 'effectif.resume.value'),
			selectTauxRisque = resolve(f, 'selectTauxRisque.resume.value'),
			taux = selectTauxRisque && selectTauxRisque['Taux net'].replace(',', '.'),
			tauxCommunGeneral = selectTauxRisque && selectTauxRisque['Taux commun quel que soit effectif ?'] == 'Oui',
		} = this.props
		if (!effectif || !steps['effectif']) return null
		return (
			<RhetoricalQuestion
				form="tauxRisque" formName="tauxRisque"
				fields={[ 'resume' ]}
				question={this.renderText(tauxCommunGeneral, taux, effectif)}
				possibleChoice={{text: 'OK', value: taux}}
				variableName="taux_accident_travail"
				serialise={v => v/100}
				/>
		)
	}

	renderText(tauxCommunGeneral, taux, effectif) {
		if (tauxCommunGeneral)
			return `Votre taux AT/MP est ${taux}% (votre activité le fixe au taux commun quel que soit votre effectif)`
		if (effectif < 20)
			return `Votre taux AT/MP est ${taux}%`
		else {
			return `Votre taux AT/MP est estimé à ${taux}%, le taux commun de votre activité.
							Rendez-vous sur net-entreprises.fr pour obtenir votre taux individuel.`
		}
	}


}

export default ResultATMP
