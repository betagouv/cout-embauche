import React, { Component } from 'react'
// import outputVariables from '../outputVariables.yaml'
import spec from '../results-spec.yaml'
import classNames from 'classnames'
import './Details.css'

export default class Details extends Component {
	render() {
		return (
			<section id="taxes">
				<table>
					<thead>
						<tr>
							<th>Éléments</th>
							<th>Part salarié</th>
							<th>Part employeur</th>
						</tr>
					</thead>
						{ Object.keys(spec)
								.filter(category => category !== 'Sommes')
								.map(c => this.renderCategory(c))
						}
				</table>

				<a href="mailto:contact@embauche.beta.gouv.fr?subject=Erreur dans les résultats du simulateur">Signaler une erreur</a>
			</section>
		)
	}
	renderCategory(categoryName) { // category = 'Santé'
		let
			category = spec[categoryName], // items = maladie, complémentaire, prévoyance
			categoryIsItem = category.employeur || category.salarie,
			itemNames = !categoryIsItem && Object.keys(category)

		return <tbody key={categoryName}>
			<tr className="category">
				<th id={categoryName}
						scope="colgroup">
						{categoryName}
				</th>
				{ categoryIsItem && this.renderTableCells(
					null, category
				)}
			</tr>
			{itemNames && itemNames.map(
				name => <tr key={name}>
					{this.renderTableCells(
							name,
							category[name]
					)}
					</tr>
			)}
		</tbody>
	}

	renderTableCells(name, {employeur, salarie, explained, clarifier}) {

		let
			{results: {[employeur]: employeurValue, [salarie]: salarieValue}, advancedQuestions, openAdvancedSection} = this.props,
			lineClarified = advancedQuestions(clarifier) != null

		return [
			...name ? [
				<td key="element" className="element">{name}</td>
			] : [],
			...[
				<td key="salarie" className="value salarie">{this.humanFigure(salarieValue)}</td>,
				<td key="employeur" className="value employeur">{this.humanFigure(employeurValue)}</td>
			]
		]

			{/* <tbody key={name} className={explained ? 'explained': ''}>
				<tr>
					<th>{name}</th>
					<td className="value">humanFigure(value)</td>
				</tr>
				{explained && !lineClarified && <tr>
					<td colSpan="100%" className="explanation">
						<p>{explained}</p>
						{clarifier && <p>
							<a href="#" onClick={openAdvancedSection}>Affinez votre situation</a>
						</p>}
					</td>
				</tr>}
			</tbody> */}
	}

	humanFigure(figure) {
		let notApplicable = figure == null
		return <span className={classNames({na:notApplicable})}>
			{notApplicable ? '--' : this.props.humanizeFigures(figure) + ' €'}
		</span>
	}
}
