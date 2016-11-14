import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default ({
	showAdvanced, toggleAdvancedSection,
	inputTouched, inputChanged,
	infoAlternance, themeColours: {textColourOnWhite}
}) =>
<section className="info-zone">
	{ !showAdvanced &&
		<ReactCSSTransitionGroup
			id="user-next-action"
			component="div"
			transitionName="user-next-action-animation"
			transitionEnterTimeout={10000}
			transitionLeaveTimeout={700} >
			{ !inputTouched &&
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
		<span>
			Note: pour une simulation plus fiable du cas de l'apprentissage, rendez-vous sur <a href="https://www.alternance.emploi.gouv.fr/portail_alternance/jcms/hl_5641" target="_blank">
				le simulateur du portail de l'alternance
			</a>
		</span>
	}

</section>
