import React, { Component } from 'react'
import {FormDecorator} from './FormDecorator'
import ReactSelect from 'react-select'
import SelectOption from './SelectOption.js'
import 'react-select/dist/react-select.css'
import './Select.css'

let getOptions = input =>
	input.length !== 5 ?
		Promise.resolve({}) :
	fetch(`https://apicarto.sgmap.fr/codes-postaux/communes/${input}`)
		.then(response => {
			if (!response.ok)
				return [ {nomCommune: 'Aucune commune trouvée', disabled: true} ]
			return response.json()
		})
		.then(json => ({options: json}))
		.catch(error =>
			({options: []})
		)

@FormDecorator('select')
export default class Select extends Component {
	render() {
		let {
			input: {
				value, onBlur, onChange,
			},
			stepProps: {submit},
		} = this.props,
			submitOnChange =
				option => {
					onChange(option)
					submit()
				}

		return (
			<div className="select-answer commune">
				<ReactSelect.Async
					onChange={submitOnChange}
					labelKey="codePostal"
					optionRenderer={({nomCommune}) => nomCommune}
					valueKey="codeInsee"
					placeholder="Entrez votre code postal"
					noResultsText="Nous n'avons trouvé aucune commune"
					searchPromptText={null}
					loadingPlaceholder="Recherche en cours..."
					loadOptions={getOptions}
				/>
			</div>
		)
	}

}
