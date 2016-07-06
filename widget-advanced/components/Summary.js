import React, { Component } from 'react'
export default class Summary extends Component {
	render() {
		let {typeEntreprise, typeSalaireEntré} = this.props,
			labelTypeEntreprise = {
				'entreprise_est_association_non_lucrative': 'association',
				'entreprise': 'entreprise',
			}[typeEntreprise],
			typeSalaire = {
				'net': 'brut',
				'brut': 'net',
			}[typeSalaireEntré]
			console.log('typeSalaireEntre', typeSalaire)

		return (
			<div className="simulation-summary">
				<h1>Résultats de l'estimation</h1>
					<div className="figures">
						<p>
							Cela coûtera
							<span className="figure" data-source="salaire_super_brut" data-round title="Salaire super-brut">…</span>&nbsp;€
							par mois
							à mon {labelTypeEntreprise}<span id="cout_du_travail_container" hidden>,
								<br />
								ou <span className="figure" data-source="cout_du_travail" data-round title="Coût du travail" />&nbsp;€ après déduction des aides différées</span>.
						</p>
						<p>
							Mon <span data-source="employee">salarié·e</span>
							touchera
							<span className="figure" id="salaire-calcule" data-source="salaire_net_a_payer" data-add-source-to-action data-round title="Salaire net">
								…
							</span> € {typeSalaire} par <span data-source="period">mois</span>.
						</p>
					</div>
					<button className="action show-details" autoComplete="off">
						<span>
							Voir le détail<br />des prélèvements
						</span>
					</button>
			</div>
		)
	}
}
