import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import {connect} from 'react-redux'
import initialValues from '../basicInputInitialValues'
import './BasicInput.css'

let selector = formValueSelector('basicInput')

@connect(state => ({
	enTempsPartiel: selector(state, 'tempsDeTravail') == 'temps_partiel',
	heuresParSemaine: selector(state, 'heuresParSemaine')
}), dispatch => ({
	changeCodeINSEE: (value) =>
		dispatch(change('basicInput', 'codeINSEE', value)),
}))
@reduxForm({
	form: 'basicInput', // a unique name for this form
	initialValues,
	destroyOnUnmount: false,
})
export default class BasicInput extends Component {
	render() {
		let
			{enTempsPartiel, heuresParSemaine} = this.props,
			SMIC = 1480.27,
			salaireMinimum = Math.round(
				!enTempsPartiel ? SMIC : SMIC * (heuresParSemaine / 35)
			)

		return (
			<form className="basic-input">
				Mon
				<Field component="select" name="typeEntreprise" >
					<option value="entreprise">entreprise</option>
					<option value="entreprise_est_association_non_lucrative">association à but non lucratif</option>
				</Field>
				de
				<label title="En équivalents temps pleins : un mi-temps vaut 0,5, par exemple.">
					<Field component="input" name="effectifEntreprise" type="number"
						min="0" placeholder="0" max="99999" />
						{/* this input's value will be incremented :
							we're simulating salaries once the new employee is recruited */}
					salariés
				</label>
				&nbsp; souhaite embaucher un·e
				<Field component="select" name="typeEmployé" >
					<option value="CDI">CDI</option>
					<option value="apprenti">apprenti·e</option>
				</Field>

				en statut
				<Field component="select" name="categorieSalarié" >
					<option value="prive_non_cadre">non-cadre</option>
					<option value="prive_cadre">cadre</option>
				</Field>

				rémunéré·e
				<fieldset>
					<Field id="salaire" name="salaire" component="input" type="number"
						min="0" max="9999999" placeholder="2300" step="any" />
					<label htmlFor="salaire">
						&nbsp; € &nbsp;
					</label>
					<span className="input-help">Rémunération totale<br/>
						<em>(min. {salaireMinimum}€)</em>, dont primes.
					</span>

					<Field component="select" name="typeSalaireEntré" >
						<option value="brut">brut</option>
						<option value="net">net</option>
					</Field>
					<span>par mois</span>

				</fieldset>
				&nbsp;
				<label>à temps
					<Field component="select" name="tempsDeTravail" >
						<option value="temps_plein">plein</option>
						<option value="temps_partiel">partiel</option>
					</Field>
				</label>
				<br />
				{ enTempsPartiel &&
					<label>
						pour
						<Field component="input" name="heuresParSemaine" type="number"
							min="0" max="35" placeholder="30" step="1" />
						heures par semaine <br/>
					</label>
				}

			</form>
		)
	}
}
