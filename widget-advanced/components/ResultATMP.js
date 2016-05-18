import React, { Component } from 'react'
import resolve from '../../utils/resolve'

class ResultATMP extends Component {
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

	render() {
		let {
			f,
			submitted,
			effectif = resolve(f, 'effectif.resume.value'),
			selectTauxRisque = resolve(f, 'selectTauxRisque.resume.value'),
			taux = selectTauxRisque && selectTauxRisque['Taux net'],
			tauxCommunGeneral = selectTauxRisque && selectTauxRisque['Taux commun quel que soit effectif ?'] == 'Oui',
		} = this.props
		if (!effectif || !submitted['effectif']) return null
		return (
			<section className="step">
				<h1 style={{cursor: 'normal'}}>{this.renderText(tauxCommunGeneral, taux, effectif)}</h1>
			</section>
		)
	}

}

export default ResultATMP
