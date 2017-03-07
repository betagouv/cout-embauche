import React, { Component } from 'react'
import spec from '../details-spec.yaml'
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
		let details = spec['Détails'],
			tables = Object.keys(details)
		return (
			<section id="taxes">
				{tables.map(t => this.renderTable(details, t))}
				<a href="mailto:contact@embauche.beta.gouv.fr?subject=Erreur dans les résultats du simulateur">Signaler une erreur</a>
			</section>
		)
	}

	renderTable(details, tableKey) {
		let
			{description, 'catégories': categories} = details[tableKey]
		return (
			<table
					key={tableKey} >
				<caption>{description}</caption>
				<thead>
					<tr>
						{headers.map( text =>
							<th>{text}</th>
						)}
					</tr>
				</thead>
					{ Object
							.keys(categories)
							.map(c => this.renderCategory(categories, c)) }
			</table>
		)
	}

	renderCategory(categories, categoryName) { // ex. category = 'Santé'
		let
			category = categories[categoryName], // ex. items = maladie, complémentaire, prévoyance
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
			<tr key="category" className="category">
				<th style={colouredTextStyle} id={categoryName}
						scope="colgroup">
						{categoryName}
				</th>
				{ categoryIsItem ? this.renderTableCells(
					null, category
				) : [
					<th className="subtotal">
						{this.humanFigure(salarieTotal)}
					</th>,
					<th className="subtotal">
						{this.humanFigure(employeurTotal)}
					</th> ]
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
			] : [], // No name, the name is the category
			...[
				<td key="salarie" className="salarie">{this.humanFigure(salarieValue)}</td>,
				<td key="employeur" className="employeur">{this.humanFigure(employeurValue)}</td>
			]
		]
	}

	humanFigure(figure) {
		let notApplicable = figure == null
		return <span className={classNames('value', {na:notApplicable})}>
			{notApplicable ? '--' : this.props.humanizeFigures(figure) + ' €'}
		</span>
	}
}
