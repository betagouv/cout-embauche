import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let Figure = ({figure, title}) =>
	<ReactCSSTransitionGroup
			transitionName="flash"
			transitionEnterTimeout={100}
			transitionLeaveTimeout={100}
			>
			<span key={figure} className="figure" title={title}>
				{figure} €
			</span>
		</ReactCSSTransitionGroup>

export default class Summary extends Component {
	render() {
		let
			{
				results: {
					salaire_super_brut, cout_du_travail, salaire_net_a_payer,
				},
				typeEntreprise, typeSalaireEntré,
				humanizeFigures: humanize,
				toggleSection,
				showDetails,
			} = this.props,
			labelTypeEntreprise = {
				'entreprise_est_association_non_lucrative': 'association',
				'entreprise': 'entreprise',
			}[typeEntreprise],
			typeSalaire = {
				'net': 'brut',
				'brut': 'net',
			}[typeSalaireEntré]

		if (salaire_super_brut == null) return null

		return (
			<div className="simulation-summary">
				<h1>{/* "Résultats de l'estimation" */}</h1>
				<div className="content">
					<div className="figures">
						<p>
							Cela coûtera <Figure title="Salaire super-brut" figure={humanize(salaire_super_brut)}/> par mois à mon {labelTypeEntreprise},
							{ (salaire_super_brut != cout_du_travail) &&
								<span>
									<br />
									ou <Figure title="Coût du travail" figure={humanize(cout_du_travail)}/>
									après déduction des aides différées.
								</span>
							}
						</p>
						<p>
							Mon salarié·e touchera <Figure title="Salaire net" figure={humanize(salaire_net_a_payer)}/>
							{typeSalaire} par mois.
						</p>
					</div>
					<button
						className="action show-details" autoComplete="off"
						onClick={toggleSection} >
						{showDetails ?
							<span>Revenir à la saisie</span> :
							<span>Voir le détail<br />des prélèvements</span>
						}
					</button>
			</div>
		</div>
		)
	}
}
