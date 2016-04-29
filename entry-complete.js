import './css/reset.css'
import './css/main.css'
import './css/results.css'
import './css/affiliation.css'
import './css/details.css'
import './css/tooltip.css'

import html from './embauche.html'
document.write(html)

require('core-js/fn/promise')

window.loadCompleteWidget = true //TODO there is probably a better way

require('expose?Embauche!./widget-simple/index')
