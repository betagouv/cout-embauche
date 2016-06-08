import React from 'react'
import hi from '../../images/hi.png'
import classnames from 'classnames'

export default ({pending}) =>
	<div id="conversation-introduction">
		<img src={hi} className={classnames({spinning: pending})}/>
	</div>
