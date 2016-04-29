// IE doesn't support locale number formats
const transformDecimalMark = (element, value) => [
	element.type == 'number',
	Number(value.replace(',', '.')),
]

/* We are simulating a recruitment,
hence requesting salaries with the new size of the entreprise */
const incrementEffectif = (element, value) => [
	element.name == 'effectif_entreprise',
	value + 1,
]

const dureeLegaleMensuelle = 151.66,
	dureeLegaleHebdomadaire = 35

/* We are simulating a recruitment,
hence requesting salaries with the new size of the entreprise */
const transformQuotite = (element, value) => [
	element.name == 'heures_remunerees_volume',
	value * (dureeLegaleMensuelle / dureeLegaleHebdomadaire),
]



export default [
	transformDecimalMark,
	incrementEffectif,
	transformQuotite,
]
