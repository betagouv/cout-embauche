import React, { Component } from 'react'
import outputVariables from '../outputVariables.yaml'
import classnames from 'classnames'

export default class Details extends Component {
	render() {
		return (
			<section className="taxes">
				{
					Object.keys(outputVariables)
						.filter(category => category !== 'Sommes')
						.map(c => this.renderCategory(c, outputVariables[c]))
				}
			</section>
		)
	}
	renderCategory(category, items) {

		return (
			<table key={category}>
				<caption>{category}</caption>
				<tbody>
					{items.map(i => this.renderItem(i))}
				</tbody>
			</table>
		)
	}

	renderItem(i) {
		let
			{results, humanizeFigures} = this.props,
			{key, name, explained, notCalculated} = i,
			figure = results[key]

		return (
			<tr key={key}
				className={classnames({explained, 'not-calculated': notCalculated})}
				title={explained} >
				<th>{name}</th>
				<td>{figure != null ? humanizeFigures(figure) : '--'} €</td>
			</tr>
		)

	}
}
