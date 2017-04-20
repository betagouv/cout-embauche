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
	state = {
		lastUpdate: null
	}
	componentDidMount() {
		fetch('https://api.github.com/repos/sgmap/cout-embauche/releases/latest')
				.then(response => {
					if (!response.ok)
						console.log('Impossible de récupérer la date de dernière mise à jour')// eslint-disable-line no-console

					return response.json()
				})
				.then(json => this.setState({lastUpdate: {date: json.published_at.substring(0, 9), link: json.html_url}}))
				.catch(() =>
					console.log('Impossible de récupérer la date de dernière mise à jour')// eslint-disable-line no-console
				)
	}
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
			buttonStyle = {borderColor: textColour, color: textColour},
			lastUpdate = this.state.lastUpdate

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
			<div id="limitations" style={{color: textColourOnWhite}}>
				<p id="sim-limitation">
					<span>
						Ce simulateur ne prend pas en compte les conventions, accords collectifs, les régimes particuliers et aides localisées.
					</span>
					<span>
						{lastUpdate &&
							<span>Mis à jour le <a href={lastUpdate.link} target="_blank">
									{new Date(lastUpdate.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric'})}
								</a>.
							</span>
						}
					</span>
				</p>
				{showDetails &&
					<p id="paie-limitation">Attention, ce détail n'est pas opposable à un bulletin de paie. En cas d'écart, vous pouvez en discuter avec votre responsable.</p>
				}
			</div>
		</section>
		)
	}
}
