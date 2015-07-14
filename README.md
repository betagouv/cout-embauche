A graphical demonstration of the Paie API.

> Un démonstrateur graphique de l'API Paie.


This is a drop-in widget to quickly test the benefits of integrating the Paie API in your product. If you want to create a new, specific GUI, have a look at the [Paie API documentation](http://embauche.sgmap.fr).


Browser compatibility
---------------------

Expected to support ES5.1-compatible browsers, i.e. IE ≥ 9, Safari ≥ 5, Opera ≥ 12, Chrome, Firefox.

**Not cross-browser tested yet.**


Drop-in widget
--------------

Include this line where you want the widget to appear in your page:

```html
<script src="https://raw.githubusercontent.com/sgmap/cout-embauche/gh-pages/dist/cout-embauche-widget.js"></script>
```

> Reminder: this widget is in early beta and may be updated at any time, without prior notice. Please send an email to embauche[AT]sgmap.fr to request being sent potentially breaking update notices.
> A versioning scheme will be made available as stabilisation occurs.


API
---

The JS API is exposed in `window.Embauche`.

At the moment, it depends on the widget being present in the DOM to load the configuration from it.

> Please open an issue if you want to consume the API in a different way.


### `Embauche.OpenFisca.get([additionalParameters], callback)`

To programmatically get other computations based on the current state of the form, use the `window.Embauche.OpenFisca.buildURL(additionalParameters)` function.

It takes as an optional parameter an object whose properties will be appended to the URL as query-string parameters, and a callback as last argument that will be called with three parameters:

- An optional error. The failed `XMLHttpRequest`, or a `SyntaxError` if the fetched OpenFisca value is not properly formatted.
- The OpenFisca-computed values.
- The full OpenFisca response if you need everything it sends back.


### `Embauche.OpenFisca.buildURL([additionalParameters])`

To programmatically create other requests based on the current state of the form, use the `window.Embauche.OpenFisca.buildURL(additionalParameters)` function. It takes as an optional parameter an object whose properties will be appended to the URL as query-string parameters, and returns the OpenFisca URL to `GET` to obtain results, as documented in the [`/formula` API](http://embauche.sgmap.fr/api/doc).
