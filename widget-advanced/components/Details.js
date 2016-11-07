import React, { Component } from 'react'
import outputVariables from '../outputVariables.yaml'

export default class Details extends Component {
	render() {
		return (
			<section className="taxes">
				{
					Object.keys(outputVariables)
						.filter(category => category !== 'Sommes')
						.map(c => this.renderCategory(c, outputVariables[c]))
				}
				<a href="mailto:contact@embauche.beta.gouv.fr?subject=Erreur dans les résultats du simulateur">Signaler une erreur</a>
			</section>
		)
	}
	renderCategory(category, items) {

		return (
			<table key={category}>
				<caption>{category}</caption>
				{items.map(i => this.renderItem(i))}
			</table>
		)
	}

	renderItem(i) {
		let
			{results, humanizeFigures, advancedQuestions, openAdvancedSection} = this.props,
			{key, name, explained, clarifier} = i,
			figure = results[key],
			lineClarified = advancedQuestions(clarifier) != null

		return (
			<tbody key={key} className={explained ? 'explained': ''}>
				<tr>
					<th>{name}</th>
					<td className="value">{figure != null ? humanizeFigures(figure) : '--'} €</td>
				</tr>
				{explained && !lineClarified && <tr>
					<td colSpan="100%" className="explanation">
						<p>{explained}</p>
						{clarifier && <p>
							<a href="#" onClick={openAdvancedSection}>Affinez votre situation</a>
						</p>}
					</td>
				</tr>}
			</tbody>
		)

	}
}
