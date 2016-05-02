import React, { Component, PropTypes } from 'react'

import Introduction from '../components/Introduction'
import Conversation from '../containers/Conversation'

import './forms.css'
import './app.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Introduction />
        <Conversation delay="3000" />
      </div>
    )
  }
}
