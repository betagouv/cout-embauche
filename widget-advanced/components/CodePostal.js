import React, { Component } from 'react'
import {Field} from 'redux-form'

export default class CodePostal extends Component {
	state = {
		message: null,
		fetchedCodes: null,
	}
	render() {
		let {message, fetchedCodes} = this.state
		return (
			<span>
				sur la <label htmlFor="codePostal">commune</label> de
				<Field id="codePostal" component="input" name="codePostal" type="text"
					placeholder="code postal" inputMode="numeric" pattern="\d{5}" maxLength="5" autoComplete="postal-code"
					title="Entrez le code postal de l'établissement où le salarié sera employé" />

				{/* Le code INSEE sera déduit du code postal entré par l'utilisateur */}
				<label htmlFor="codeINSEE">{message}</label>
				{ fetchedCodes &&
					<Field component="select" name="codeINSEE" >
						{fetchedCodes.map(item =>
							<option key={item.codeInsee} value={item.codeInsee}>{item.nomCommune}</option>
						)}
					</Field>
				}
			</span>
		)
	}
	componentWillReceiveProps({codePostal}) {
		if (!codePostal || codePostal.length !== 5)
			return this.setErrorMessage('', this.state.fetchedCodes)

		if (codePostal != this.props.codePostal)
			this.fetchCodes(codePostal)
	}

	fetchCodes(newCodePostal) {
		/*
			L'utilisateur a renseigné un nouveau code postal,
			Proposons-lui les codes INSEE correspondant
			(nécéssaires pour calculer le versement transport) */
			//TODO use new géoAPI, handle les codes des arrondissements
		fetch(`https://apicarto.sgmap.fr/codes-postaux/communes/${newCodePostal}`)
			.then(response => {
				if (!response.ok) {
					//TODO handle error
					// const error = new Error(response.statusText)
					// error.response = response
					// throw error
				}
				return response.json()
			})
			.then(json => {
				if (json.length === 0)
					this.setErrorMessage('Aucune commune n\'a été trouvée')
				else {
					this.setState({message: '', fetchedCodes: json})
					this.props.changeCodeINSEE(json[0].codeInsee)
				}
			})
			.catch(error =>
				this.setErrorMessage('Le code postal n\'a pas pu être pris en compte')
				//TODO handle error  && console.error(error)
			)
	}
	setErrorMessage(message, erase) {
		this.setState({message, fetchedCodes: null})
		if (erase)
			this.props.changeCodeINSEE('')
	}
}
