/*
	inputData contient à la fois la valeur par défaut de la saisie pour le formulaire basique,
	et la fonction de transformation (si pertinent)
	*/

let	today = new Date()

let	inputData = {
	// Beaucoup de valeurs, dont les questions intermédiaires de la simulation avancée, ne seront pas envoyées


	/****** Simulation simple *******/

	// Celles-ci ne seront pas transformées, mais envoyées telles quelles (nécessaires à la simulation)
	allegement_fillon_mode_recouvrement: 'anticipe_regularisation_fin_de_periode',
	allegement_cotisation_allocations_familiales_mode_recouvrement: 'anticipe_regularisation_fin_de_periode',


	// Cette valeur n'est pas captée, car déductible sans saisie
	contrat_de_travail_debut: today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2),

	//TODO apprenti

	typeEmployé: v => v === 'apprenti' ? {apprenti: true}: {},

	/* Le type d'entreprise association 190X n'est pas défini comme une catégorie dans OpenFisca,
	mais comme un booléen */
	typeEntreprise: [
		'entreprise',
		value => value === 'entreprise_est_association_non_lucrative' && {
			'entreprise_est_association_non_lucrative': true,
		},
	],

	/* Nous simulons une embauche, donc nous incrémentons l'effectif */
	effectifEntreprise: [
		0,
		value => ({'effectif_entreprise': value + 1}),
	],

	/* Nous voulons un ratio : on multiplie donc le nombre d'heures par semaine capté par
	 (la durée légale mensuelle divisée par la durée légale hebdomadaire) */
	heuresParSemaine: [
		30,
		value => ({ 'heures_remunerees_volume': value * (151.66 / 35)}),
	],

	typeSalaireEntré: [ 'brut', () => ({}) ],

	//TODO handle salaire brut / net
	salaire: [
		2300,
		(value, values) => ({
			// Use other values to determine the name of this key
			[values['typeSalaireEntré'] == 'brut' ?
				'salaire_de_base' :
				'salaire_net_a_payer'
			]: value }),
	],

	tempsDeTravail: [
		'temps_plein',
		value => ({'contrat_de_travail': value}),
	],

	categorieSalarié: [
		'prive_non_cadre',
		value => ({'categorie_salarie': value}),
	],

	codeINSEE: [
		'',
		({codeInsee}) => ({'depcom_entreprise': codeInsee || ''}),
	],

	/****** Simulation avancée *******/

	mutuelle: v => ({'complementaire_sante_montant': v}),

	pourcentage_alternants: v => ({'ratio_alternants': v / 100}),

	jei: v => ({jeune_entreprise_innovante: v === 'Oui' ? 1 : 0}),

	tauxRisque: v => ({taux_accident_travail: v / 100}),

}

// Extraction des valeurs initiales de l'object précédent
let initialValues =
	Object.keys(inputData)
		.reduce((final, i) => {
			let data = inputData[i],
				initialValue = Array.isArray(data) ? {[i]: data[0]} : {}
			return Object.assign(final, initialValue)
		}, {})

export {
	initialValues,
	inputData,
}
