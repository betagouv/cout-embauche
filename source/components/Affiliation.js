import React from 'react'
import './Affiliation.css'

export default () =>
	<section id="affiliation">
		<a href="https://openfisca.fr" target="_blank">
			<img alt="OpenFisca" src="https://www.openfisca.fr/hotlinks/logo-openfisca.svg" />
		</a>
    <a href="https://beta.gouv.fr" target="_blank">
      <img id="logo-SGMAP" alt="Secrétariat Général pour la Modernisation de l'Action Publique" src={require('../images/logo-SGMAP.svg')} />
    </a>
		<a id="affiliation-contact" href="mailto:contact@embauche.beta.gouv.fr?subject=A propos du simulateur d'embauche">contact</a>
  </section>
