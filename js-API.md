
JS API
---

The JS API is exposed in `window.Embauche`, once the widget is integrated as a non-iframe script.

### `window.Embauche.OpenFisca.getLastResults()`

Returns the currently-displayed computed simulation data, as an object containing the OpenFisca-computed values, as identifiers from the OpenFisca [legislation](http://legislation.openfisca.fr) mapped to `Number` values.


### `window.Embauche.OpenFisca.get([additionalParameters], callback)`

Calls the Paie API, parameterised with the current state of the form.

You can adjust the situation to compute by passing an object as the first argument (`additionalParameters`). The parameters you can use are documented in the [Paie API](http://embauche.beta.gouv.fr/api/doc).

This function takes a callback as last argument. This callback will be called with three parameters:

- An optional error. The failed `XMLHttpRequest`, or a `SyntaxError` if the fetched OpenFisca value is not properly formatted.
- An object containing the OpenFisca-computed values, as identifiers from the OpenFisca [legislation](http://legislation.openfisca.fr) mapped to `Number` values.
- The full OpenFisca [response](http://embauche.beta.gouv.fr/api/doc) if you need everything it sends back.

If the callback is not input, returns the OpenFisca `GET` URL to obtain the results, as documented in the [`/formula` API](http://embauche.beta.gouv.fr/api/doc).

#### Example:

```js
window.Embauche.OpenFisca.get({
	zone_revitalisation_rurale: true
}, function(error, results) {
	if (error) throw error;
	window.alert('Employer would pay ' + results.salaire_super_brut + ' if this geographic zone was elected as a ZRR.')
});
```
