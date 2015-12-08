A graphical demonstration of the Paie API.

> Un démonstrateur graphique de l'API Paie, intégrable en une ligne de code.

**[Online demo](http://sgmap.github.io/cout-embauche/)**.

This is a drop-in widget to quickly test the benefits of integrating the Paie API in your product. If you want to create a new, specific GUI, have a look at the [Paie API documentation](http://embauche.sgmap.fr).


Usage
-----

Include this line where you want the widget to appear in your page:

```html
<script src="https://rawgit.com/sgmap/cout-embauche/gh-pages/dist/cout-embauche-widget.js"></script>
```

> Reminder: this widget is in early beta and may be updated at any time. Please send an email to embauche[AT]sgmap.fr to request being sent potentially breaking update notices.
>
> There are no uptime guarantees on the hosting of this widget.
>
> A versioning scheme will be made available as stabilisation occurs.


### Using with Bootstrap

If you use [Twitter Bootstrap CSS](http://getbootstrap.com), an integration is provided. Simply add the following line after the inclusion of the widget:

```html
<script async src="https://rawgit.com/sgmap/cout-embauche/gh-pages/dist/bootstrap-compat.js"></script>
```


Browser compatibility
---------------------

### [Continuously tested](https://circleci.com/gh/sgmap/cout-embauche) on:

[![Integration Tests Results](https://saucelabs.com/browser-matrix/sgmap-embauche-bot.svg)](https://saucelabs.com/u/sgmap-embauche-bot)


### Also known to be compatible with:

- IE10.
- Safari 8.
- Opera 28.

> These tests are run manually and may not be as up-to-date as the above.


### Not compatible with:

- IE < 10.
- Safari < 5.1.
- Opera < 11.5.


API
---

The JS API is exposed in `window.Embauche`.

At the moment, it depends on the widget being present in the DOM to load the configuration from it.

> Please open an issue if you want to consume the API in a different way.


### `window.Embauche.OpenFisca.getLastResults()`

Returns the currently-displayed computed simulation data, as an object containing the OpenFisca-computed values, as identifiers from the OpenFisca [legislation](http://legislation.openfisca.fr) mapped to `Number` values.


### `window.Embauche.OpenFisca.get([additionalParameters], callback)`

Calls the Paie API, parameterised with the current state of the form.

You can adjust the situation to compute by passing an object as the first argument (`additionalParameters`). The parameters you can use are documented in the [Paie API](http://embauche.sgmap.fr/api/doc).

This function takes a callback as last argument. This callback will be called with three parameters:

- An optional error. The failed `XMLHttpRequest`, or a `SyntaxError` if the fetched OpenFisca value is not properly formatted.
- An object containing the OpenFisca-computed values, as identifiers from the OpenFisca [legislation](http://legislation.openfisca.fr) mapped to `Number` values.
- The full OpenFisca [response](http://embauche.sgmap.fr/api/doc) if you need everything it sends back.

#### Example:

```js
window.Embauche.OpenFisca.get({
	zone_revitalisation_rurale: true
}, function(error, results) {
	if (error) throw error;
	window.alert('Employer would pay ' + results.salaire_super_brut + ' if this geographic zone was elected as a ZRR.')
});
```


### `window.Embauche.OpenFisca.buildURL([additionalParameters])`

Prepares a `GET` query to the [Paie API](http://embauche.sgmap.fr/api/doc), parameterised with the current state of the form.

You can adjust the situation to compute by passing an object as the first argument (`additionalParameters`). The parameters you can use are documented in the [Paie API](http://embauche.sgmap.fr/api/doc).

Returns the OpenFisca URL to `GET` to obtain results, as documented in the [`/formula` API](http://embauche.sgmap.fr/api/doc).

> If you simply want to obtain the results of calling this API, use `Embauche.OpenFisca.get`.


Build
-----

This widget is packaged with [Webpack](http://webpack.github.io) and distributed through [RawGit CDN](https://rawgit.com).

> RawGit does not offer any guarantees, we will distribute on our own servers when we get enough users to justify the investment.


### Compilation

To compile your modifications, clone this repository, `cd` to it and `npm install`. You can then run `npm run compile` whenever you change a file to update files under `dist`.

Run `npm run dev` to get [webpack's development server](https://webpack.github.io/docs/webpack-dev-server.html) and visit the ouput url to work on `index.html` with automatic page reloading on source change.

To work directly on a module with automatic page reloading , e.g. the `cout-embauche-widget`, add  `dist/cout-embauche-widget` at the end of the ouput url.


### Distribution

Simply compile the widget and push your changes on GitHub.


Test
----

This widget is covered by integration tests written with [Watai](https://github.com/MattiSG/Watai) under the `test` folder. To run them locally, follow the [installation guide](https://github.com/MattiSG/Watai#installing) and run `npm test`.

These tests are run continuously on [CircleCI](https://circleci.com/gh/sgmap/cout-embauche).
