import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import themeColour from '../themeColour'

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
				results,
				results: {
					salaire_super_brut, cout_du_travail,
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
			correspondanceSalaires = {
				'net': [ 'brut', 'Salaire brut', 'salaire_de_base' ],
				'brut': [ 'net', 'Salaire net', 'salaire_net_a_payer' ],
			}[typeSalaireEntré],
			[ salaireTitle, salaireDescription, salaireVariable ] = correspondanceSalaires,
			salaireFigure = results[salaireVariable]

		return (
			<div className="simulation-summary">
				<div className="content" style={{background: themeColour}}>
					<div className="figures">
						<p>
							Cela coûtera <Figure title="Salaire super-brut" figure={humanize(salaire_super_brut)}/> par mois à mon {labelTypeEntreprise},
							{ (salaire_super_brut != cout_du_travail) &&
								<span>
									<br />
									ou <Figure title="Coût du travail" figure={humanize(cout_du_travail)}/>
									&nbsp;après déduction des aides différées.
								</span>
							}
						</p>
						<p>
							Mon salarié·e touchera <Figure title={salaireDescription} figure={humanize(salaireFigure)}/>&nbsp;
							{salaireTitle} par mois.
						</p>
					</div>
					<button	type="button"
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
