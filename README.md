A widget to estimate the price of hiring in France : social security contributions minus national exemptions.

> Module Web d'estimation du prix d'une embauche en France. Ce document est technique, et donc rédigé en anglais pour favoriser la réutilisation.

**[Online demo](http://sgmap.github.io/cout-embauche/)**.

If you want to create your own specific interface, have a look at the [API documentation](https://embauche.beta.gouv.fr/api-prelevements-sociaux).


Usage
-----

Include this line where you want the widget to appear in your page:

```html
 <script id="script-simulateur-embauche" src="dist/simulateur.js" data-couleur="#4A89DC"></script>
 ```

It will add an iframe to your page, containing the simulation interface.

> Reminder: this widget is in beta and may be updated at any time. Please send an email to contact[AT]embauche.beta.gouv.fr to request being sent potentially breaking update notices.

### Style

The widget's style is deliberately simple and used only one color. Set your own color as an attribute to the `script` tag above to blend it in your page's visual theme.


### Alternative integration

For a deeper style personnalisation, or to be able to use the JS API (see its documentation at `./js-API.md`) the widget can be integrated as a no-iframe script. Learn how by reading `./iframe.html` page or contacting us at contact[AT]embauche.beta.gouv.fr.


Development
---------------------


Run :

```
npm i
npm start
```
and open `localhost:3000`.


### Testing

The widget is tested with Enzyme in a headless browser environment.

```
npm run test
```
> This command also runs the js and css linters.

### Compilation

The development version is heavy and slow. Use this in production :

```
npm run compile
```

Architecture
-------------------

The app is built with `React`, `Redux` and `Redux-forms`. Read the [Redux introduction](http://redux.js.org/) before going further. The computations rely on the OpenFisca `/formula` API through a dedicated instance.

The app can be in 3 different states. The `Summary` component is always visible to give a live summary of the results.
- basic input, the inital app state, providing you with a fast estimation before your water is boiled. It is displayed in a "cloze test" design.
- advanced input to go further, ~10 questions while your tea infuses, displayed in a conversational design.
- a detailed view that dissects the results

When the user fills the forms :
- `Redux-forms` updates the state with raw inputs
- `sagas` watch the form update action and triggers, if needed, a simulation API call with the app state, reprocessed. The simulation results are stored in the app state too.
- The `React` components, notably the `Summary` and `Details` views use the app state to display the results to the user.


The `Conversation` component handles the advanced form. The conversation is composed of form components, augmented with the `formDecorator` higher order component ([read about it](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)).


Browser compatibility
---------------------

### The widget is compatible with most recent browsers :

- IE10. TODO. (not compatible with IE < 10)
- Safari 8. TODO
- Firefox (latest stable) TODO
- Chrome (latest stable) TODO

> These tests are run manually
