import React, { Component } from 'react'
export default class ErrorZone extends Component {
	render() {
		return (
			<section className="info-zone">
				{this.props.infoAlternance &&
					<span>
						Note: pour une simulation plus fiable du cas de l'apprentissage, rendez-vous sur <a href="https://www.alternance.emploi.gouv.fr/portail_alternance/jcms/hl_5641" target="_blank">
							le simulateur du portail de l'alternance
						</a>
					</span>}

			</section>
		)
	}
}
