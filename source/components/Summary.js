import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let Figure = ({figure, title, textColour}) =>
	<ReactCSSTransitionGroup
			transitionName="flash"
			transitionEnterTimeout={100}
			transitionLeaveTimeout={100}
			>
			<span key={figure} className="figure" title={title} style={{color: textColour}} >
				{figure} €
			</span>
		</ReactCSSTransitionGroup>

@connect(state => ({themeColours: state.themeColours}))
export default class Summary extends Component {
	render() {
		let
			{
				themeColours: {colour, textColour, lighterTextColour, textColourOnWhite},
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
			salaireFigure = results[salaireVariable],
			paragraphBorderStyle = {borderColor: textColour},
			buttonStyle = {borderColor: textColour, color: textColour}

		return (
			<section className="simulation-summary">
				<div className="content" style={{background: colour, color: lighterTextColour}}>
					<div className="figures">
						<p style={paragraphBorderStyle}>
							Mon {labelTypeEntreprise} versera <Figure textColour={textColour} title="Salaire super-brut" figure={humanize(salaire_super_brut)}/> par mois
							{ (salaire_super_brut != cout_du_travail) ?
								<span>,
									<br />
									ou <Figure textColour={textColour} title="Coût du travail" figure={humanize(cout_du_travail)}/>
									&nbsp;après déduction des aides différées.
								</span> :
								<span>.</span>
							}
						</p>
						<p style={paragraphBorderStyle}>
							Mon salarié·e touchera <Figure textColour={textColour} title={salaireDescription} figure={humanize(salaireFigure)}/>&nbsp;
							{salaireTitle} par mois.
						</p>
					</div>
					<button	type="button"
						className="action show-details" autoComplete="off"
						onClick={toggleSection}
						style={buttonStyle} >
						{showDetails ?
							<span>Revenir à la saisie</span> :
							<span>Voir le détail<br />des prélèvements</span>
						}
					</button>
			</div>
			<div id="limits" style={{color: textColourOnWhite}}>Ce simulateur ne prend en compte les conventions, accords collectifs, les régimes particuliers et les règles relatives au congés.</div>
		</section>
		)
	}
}
