import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default ({
	showAdvanced, toggleAdvancedSection,
	inputTouched, inputChanged,
	infoAlternance, themeColours: {textColourOnWhite},
	pending
}) =>
<section className="info-zone">
	{ !showAdvanced &&
		<ReactCSSTransitionGroup
			id="user-next-action"
			component="div"
			transitionName="user-next-action-animation"
			transitionEnterTimeout={10000}
			transitionLeaveTimeout={700} >
			{ !inputTouched && !inputChanged &&
				<div key="1" className="input-tip">
					<p>Renseignez votre situation ci-dessus</p>
				</div>
			}
			{ inputChanged &&
				<div key="2" className="input-tip">
					<p>Votre estimation est mise à jour à chaque changement</p>
					<p>Pour des résultats plus précis,&nbsp;
						<a href="#" style={{color: textColourOnWhite}}
						id="show-advanced"
						onClick={toggleAdvancedSection}
						title="Allez plus loin dans l'estimation avec quelques questions supplémentaires">
						affinez votre situation
					</a> (moins de 10 questions)
					</p>
				</div>
			}
		</ReactCSSTransitionGroup>
	}
	{ showAdvanced &&
		<a href="#"
		id="reinit"
		onClick={toggleAdvancedSection}
		title="Réinitialiser les questions supplémentaires">
		Réinitialiser
		</a>
	}
	{	infoAlternance &&
		<p className="alternance">
			Note: pour une simulation plus fiable du cas de l'apprentissage, rendez-vous sur <a href="https://www.alternance.emploi.gouv.fr/portail_alternance/jcms/hl_6238/simulateur-alternant" target="_blank">
				le simulateur du portail de l'alternance
			</a>
		</p>
	}
	{
		typeof pending == 'string' &&
		<p className="error">
			<span className="error-warning">Une erreur s'est produite. </span><br/>
			Pensez à vérifier votre connexion, à <a href="https://browser-update.org/fr/update.html" target="_blank">utiliser un navigateur à jour</a>, ou à nous <a href="mailto:contact@embauche.beta.gouv.fr?subject=Erreur lors de la simulation">contacter.</a>
	</p>
	}

</section>
