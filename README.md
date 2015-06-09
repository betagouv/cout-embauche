A graphical demonstration of the Paie API.

> Un démonstrateur graphique de l'API Paie.


Browser compatibility
---------------------

Expected to support ES5.1-compatible browsers, i.e. IE ≥ 9, Safari ≥ 5, Opera ≥ 12, Chrome, Firefox.

**Not cross-browser tested yet.**


API
---

The JS API is exposed in `window.Embauche`. All exported files are in `js`.

**WARNING**: inclusion order of JS files matters.


### `Embauche.OpenFisca.get([additionalParameters], callback)`

To programmatically get other computations based on the current state of the form, use the `window.Embauche.OpenFisca.buildURL(additionalParameters)` function.

It takes as an optional parameter an object whose properties will be appended to the URL as query-string parameters, and a callback as last argument that will be called with three parameters:

- An optional error. The failed `XMLHttpRequest`, or a `SyntaxError` if the fetched OpenFisca value is not properly formatted.
- The OpenFisca-computed values.
- The full OpenFisca response if you need everything it sends back.


### `Embauche.OpenFisca.buildURL([additionalParameters])`

To programmatically create other requests based on the current state of the form, use the `window.Embauche.OpenFisca.buildURL(additionalParameters)` function. It takes as an optional parameter an object whose properties will be appended to the URL as query-string parameters, and returns the OpenFisca URL to `GET` to obtain results, as documented in the [`/formula` API](http://embauche.sgmap.fr/api/doc).
