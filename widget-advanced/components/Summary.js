import React, { Component } from 'react'
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
console.log(this.props.results);
		if (salaire_super_brut == null) return null

		return (
			<div className="simulation-summary">
				<h1>{/* "Résultats de l'estimation" */}</h1>
				<div className="content">
					<div className="figures">
						<p>
							Cela coûtera <span className="figure" title="Salaire super-brut">
								{humanize(salaire_super_brut)} €
							</span> par mois à mon {labelTypeEntreprise},
							{ (salaire_super_brut != cout_du_travail) &&
								<span>
									<br />
									ou <span className="figure" title="Coût du travail">{humanize(cout_du_travail)} €</span> après déduction des aides différées.
								</span>
							}
						</p>
						<p>
							Mon salarié·e touchera <span className="figure" title="Salaire net">
								{humanize(salaire_net_a_payer)} €
							</span> {typeSalaire} par mois.
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