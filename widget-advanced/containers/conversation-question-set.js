import React from 'react'
import { Percentage, Euro } from '../formValueTypes.js'
import validate from '../validators.js'

export default {
	'mutuelle': {
		attributes: {
			type: 'number',
			step: 'any',
			placeholder: 'par ex. 30',
		},
		valueType: Euro,
		valueIfIgnored: '30',
		rework: v =>
			v.replace(/,/g, '.') // commas -> dots
			.replace(/\s/g, ''), // remove spaces
		validate: v => validate(v, 'number'),
		helpText:
			<p>
				L'employeur a l'obligation en 2016 de proposer et financer à 50% une offre
				de complémentaire santé. Son montant est libre, tant qu'elle couvre un panier légal de soins.
				<br/>
				<a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F33754" target="_blank">
					Voir les détails.
				</a>
			</p>,
	},

	'pourcentage_alternants': {
		attributes: {
			type: 'number',
			step: 'any',
			min: '0',
			max: '100',
		},
		valueType: Percentage,
		valueIfIgnored: '0',
		rework: v =>
			v.replace(/,/g, '.') // commas -> dots
			.replace(/\s/g, ''), // remove spaces
		validate: v => validate(v, 'number'),
		helpText: <p>Ce pourcentage de l'ensemble de vos salariés nous permet de calculer le montant de la Contribution Supplémentaire à l'Apprentissage, destinée à encourager cette forme d'emploi.</p>,
	},

	'tauxRisqueConnu': {
		choices: [ 'Oui', 'Non' ],
		helpText:
		<p>
			Cotisation accidents du travail (AT) et maladies professionnelles (MP). Son taux est accessible sur &nsbp;
			<a href="http://www.net-entreprises.fr/html/compte-accident-travail.htm" target="_blank">net-entreprises.fr</a> ou reçu par courrier.
		</p>,
	},

	'tauxRisque': {
		attributes: {
			type: 'number',
			step: 'any',
			min: '0',
			max: '200',
			placeholder: '1.1',
		},
		rework: v =>
			v.replace(/,/g, '.') // commas -> dots
			.replace(/\s/g, ''), // remove spaces
		validate: v => validate(v, 'number'),
		valueType: Percentage,
	},

	'selectTauxRisque': {
		fields: [ 'resume' ],
		human: v => v.text,
		optionsURL: 'https://cdn.rawgit.com/laem/taux-collectifs-cotisation-atmp/master/taux-2016.json',
	},

	'jei': {
		choices: [ 'Oui', 'Non' ],
		valueIfIgnored: 'Non',
		helpText: 'Votre entreprise doit être éligible à ce statut, et votre employé doit avoir une fonction de recherche et développement. En savoir plus : https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188',
	},
}
