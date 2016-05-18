import React from 'react'

export default (props) => {
	if (props.when) {
		return (
			<div className='form-group'>
				{props.name &&
					<h3>{props.name}</h3>
				}
				{props.children}
			</div>
		)
	} else return null

}
