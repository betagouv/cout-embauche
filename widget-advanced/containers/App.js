import React, { Component, PropTypes } from 'react'

import Introduction from '../components/Introduction'
import Conversation from '../containers/Conversation'

import './forms.css'
import './app.css'

export default class App extends Component {
  render() {
    /*
      C'est ici qu'est définie la suite de questions à poser.
    */
    return (
      <div>
        <Introduction />
        <Conversation />
      </div>
    )
  }
}
