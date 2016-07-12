import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import classnames from 'classnames'

/* Ceci est une saisie de type "radio" : l'utilisateur choisit une réponse dans une liste.
FormDecorator permet de factoriser du code partagé par les différents types de saisie,
dont Question est un example */
@FormDecorator
export default class Question extends Component {
	render() {
		let {
			name,
			input,
			input: {stepProps: {submit, choices}, ...rest},
			touched, error, disabled,
		} = this.props

		return (
			<span>
				{ choices.map((choice) =>
						( <label key={choice} className={classnames('radio', {checked: choice === input.value})}>
								<input
									type="radio" {...rest} onClick={submit}
									value={choice} checked={choice === input.value ? 'checked' : ''} />
								{choice}
							</label>
						)
				)}
			</span>
		)
	}
}
