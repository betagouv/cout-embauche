require('./css/main.css');
require('./css/details.css');
require('./css/tooltip.css');

document.write(require('./assets/embauche.html'));

window.Embauche = require('./js/index');

require('./lib/details.polyfill.js');
