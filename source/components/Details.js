import React, { Component } from 'react'
// import outputVariables from '../outputVariables.yaml'
import spec from '../results-spec.yaml'
import classNames from 'classnames'
import './Details.css'

let
	headers = [
		'Éléments',
		'Part salarié',
		'Part employeur'
	]


export default class Details extends Component {
	render() {
		let headerStyle = {
			borderBottom: '1px solid ' + this.props.colours.textColourOnWhite,
			color: this.props.colours.textColourOnWhite
		}
		return (
			<section id="taxes">
				<table>
					<thead>
						<tr>
							{headers.map( text =>
								<th style={headerStyle}>{text}</th>
							)}
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
			itemNames = !categoryIsItem && Object.keys(category),
			colouredTextStyle = {color: this.props.colours.textColourOnWhite},
			[salarieTotal, employeurTotal] =
				itemNames ? itemNames.reduce(
					([st, et], name) => {
						let [s=0, e=0] = this.getResults(category[name])
						return [st + s, et + e]
					},
					[0, 0]
				) : []

		return <tbody key={categoryName}>
			<tr className="category">
				<th style={colouredTextStyle} id={categoryName}
						scope="colgroup">
						{categoryName}
				</th>
				{ categoryIsItem ? this.renderTableCells(
					null, category
				) : [
					<th className="subtotal" style={colouredTextStyle}>{this.humanFigure(salarieTotal)}</th>,
					<th className="subtotal" style={colouredTextStyle}>{this.humanFigure(employeurTotal)}</th> ]
				}
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

	renderExplanation({explanation, clarifier}) {
		let {openAdvancedSection, advancedQuestions} = this.props,
			lineClarified = advancedQuestions(clarifier) != null

		if (!explanation || lineClarified) return null
		return <div className="explanation">
			<span>{explanation}</span>
			{clarifier &&
				<a style={{color: this.props.colours.textColourOnWhite}} href="#" onClick={openAdvancedSection}>Affinez votre situation</a>
			}
		</div>
	}

	getResults({employeur, salarie}) {
		let {
			results: {
				[salarie]: salarieValue,
				[employeur]: employeurValue
			}
		} = this.props
		return [salarieValue, employeurValue]
	}

	renderTableCells(name, line) {
		let
			[salarieValue, employeurValue] = this.getResults(line)

		return [
			...name ? [
				<td key="element" className="element">
					{name}
					{this.renderExplanation(line)}
				</td>
			] : [],
			...[
				<td key="salarie" className="value salarie">{this.humanFigure(salarieValue)}</td>,
				<td key="employeur" className="value employeur">{this.humanFigure(employeurValue)}</td>
			]
		]
	}

	humanFigure(figure) {
		let notApplicable = figure == null
		return <span className={classNames({na:notApplicable})}>
			{notApplicable ? '--' : this.props.humanizeFigures(figure) + ' €'}
		</span>
	}
}
