root				: '#taxes',
toggleLink			: '#taxes summary',
taxesList			: '#taxes table',
randomTax			: '#taxes [data-source]',
impreciseTaxValue	: '#taxes .imprecise [data-source]',
taxTooltipText		: '#taxes .imprecise aside p',
createTestButton	: '#createTest',

hoverOverImpreciseTax: function() {
	return this.impreciseTaxValue.then(function(impreciseTaxValue) {
		return impreciseTaxValue.moveTo()
	})
}
