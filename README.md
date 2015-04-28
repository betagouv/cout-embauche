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

If you want to programmatically create other requests based on the current state of the form, use the `window.Embauche.OpenFisca.buildURL(additionalParameters)` function.
