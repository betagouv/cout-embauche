import React from 'react'

export default ({text, folded, onClick}) => {
	if (folded) {
		return <div className="title-stack" onClick={onClick}>
			<h1>{text}</h1>
			<h1>{text}</h1>
		</div>
	}
	else
		return <h1 className="group-title">{text}</h1>

}
