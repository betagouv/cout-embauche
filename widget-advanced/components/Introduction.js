import React from 'react'
import hi from '../../images/hi.png'

export default () =>
  <div id="conversation-introduction">
    <div>
      <img src={hi} />
    </div>
    <div>
      Bienvenue dans le simulateur avancé !
    </div>
    <div>
      Des questions vont s'afficher, répondez-y et les résultats de simulation se mettront à jour.
    </div>
    <div>
      Revenez sur vos pas en cliquant sur vos réponses.
    </div>
  </div>
