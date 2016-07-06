/*
	Le formulaire est initialisé avec ces valeurs, puis modifié par l'utilisateur. Elles pourront ensuite être
	transformées par une fonction avant d'être envoyées à OpenFisca */

let	today = new Date()

let	basicInputData = {

	// Celles-ci ne seront pas transformées
	allegement_fillon_mode_recouvrement: 'anticipe_regularisation_fin_de_periode',
	allegement_cotisation_allocations_familiales_mode_recouvrement: 'anticipe_regularisation_fin_de_periode',

	// Celles-ci ne seront pas envoyées par la requête
	typeEmployé: [ 'cdi', () => null ],
	typeSalaireEntré: [ 'brut', () => null ],


	/* Le type d'entreprise n'est pas défini comme une catégorie dans OpenFisca,
	mais comme des booléens */
	typeEntreprise: [
		'entreprise',
		value => value === 'entreprise_est_association_non_lucrative' && {
			'entreprise_est_association_non_lucrative': true,
		},
	],

	/* We are simulating a recruitment,
	hence requesting salaries with the new size of the entreprise */
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

	//TODO handle salaire brut / net
	salaire: [
		2300,
		value => ({ 'salaire_de_base': value }),
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
		value => ({'depcom_entreprise': value}),
	],

	contrat_de_travail_debut: today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2),

	//TODO

}

// Extraction des valeurs initiales de l'object précédent
let initialValues =
	Object.keys(basicInputData)
		.reduce((final, i) => {
			let value = basicInputData[i],
				initialValue = {[i]: typeof value === 'string' ? value : value[0]}
			return Object.assign(final, initialValue)
		}, {})

export {
	initialValues,
	basicInputData,
}
