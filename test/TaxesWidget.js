root				: '#taxes',
toggleLink			: '#taxes summary',
taxesList			: '#taxes .category',
randomTax			: '#taxes [data-source]',
impreciseTaxValue  : '#taxes .imprecise [data-source]',
impreciseTaxTooltipText  : '#taxes .imprecise .explanation div',
createTestButton	: '#createTest',

hoverOverImpreciseTax: function() {
    return this.impreciseTaxValue.then(function(resultElement) {
        return resultElement.moveTo()
    })
}
