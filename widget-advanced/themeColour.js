let
	script = document.currentScript || [ ...document.getElementsByTagName('script') ].pop(),
	customColour = script.getAttribute('couleur'),
	// Use the default theme colour if the host page hasn't made a choice
	defaultColour = '#4A89DC',
	themeColour = customColour || defaultColour

export default themeColour
