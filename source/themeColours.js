import findContrastedTextColour from './findContrastedTextColour'

let
	script = document.currentScript || [ ...document.getElementsByTagName('script') ].pop(),
	customColour = script && script.getAttribute('couleur'),
	// Use the default theme colour if the host page hasn't made a choice
	defaultColour = '#4A89DC',
	themeColour = customColour || defaultColour,
	textColour = findContrastedTextColour(themeColour, true), // the 'simple' version feels better...
	inverseTextColour = textColour === '#ffffff' ? '#000' : '#fff',
	lightenTextColour = textColour => textColour === '#ffffff' ? 'rgba(255, 255, 255, .85)' : '#333',
	lighterTextColour = lightenTextColour(textColour),
	lighterInverseTextColour = lightenTextColour(inverseTextColour),
	textColourOnWhite = textColour === '#ffffff' ? themeColour : '#333'

export {
	themeColour,
	textColour,
	inverseTextColour,
	lighterTextColour,
	lighterInverseTextColour,
	textColourOnWhite,

}
