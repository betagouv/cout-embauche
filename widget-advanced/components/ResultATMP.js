import React, { Component } from 'react'
import resolve from '../../utils/resolve'
import RhetoricalQuestion from './Forms/RhetoricalQuestion'

class ResultATMP extends Component {
	render() {
		let {
			steps,
			effectif,
			selectedTauxRisque,
			taux = selectedTauxRisque && selectedTauxRisque['Taux net'].replace(',', '.'),
			tauxCommunGeneral = selectedTauxRisque && selectedTauxRisque['Taux commun quel que soit effectif ?'] == 'Oui',
		} = this.props

		if (!steps.get('selectTauxRisque')) return null
		return (
			<RhetoricalQuestion
				visible={true}
				name="tauxRisque"
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
