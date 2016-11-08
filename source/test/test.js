import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import App from '../containers/App'
import reducers from '../reducers'
import DevTools from '../DevTools'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

import { mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

let sagaMiddleware = createSagaMiddleware()

let createFinalStore = compose(
	// Enables your middleware:
	applyMiddleware(sagaMiddleware), // any Redux middleware, e.g. redux-thunk
	// Provides support for DevTools:
	DevTools.instrument()
)(createStore)


let store = createFinalStore(reducers)
sagaMiddleware.run(rootSaga)

let nodeToNumber = (node) =>
	+node.text().replace('€', '').replace(',', '')

describe('Test du simulateur de coût d\'embauche', function() {
	this.timeout(5000)

	let app = mount(<App store={store} />)

  it('Le salaire super brut par défaut est supérieur à 3000 €', (done) => {
		setTimeout(() => {
			expect(nodeToNumber(app.find('.figure').first())).to.be.above(3000)
			done()
		}, 1000)
  })
	it('Ce salaire doit grossir après une élevation du salaire brut', (done) => {
		app.find('#salaire').simulate('change', {target: {value: '6000'}})
		setTimeout(() => {
			expect(nodeToNumber(app.find('.figure').first())).to.be.above(8000)
			done()
		}, 1000)
	})
	it('Les détails doivent pouvoir s\'afficher', (done) => {
		app.find('.show-details').simulate('click')
		setTimeout(() => {
			expect(
				app.find('tbody td.value').first().text()
			).to.not.equal('-- €') // to not be the default value (API error)
			app.find('.show-details').simulate('click') //revert
			done()
		}, 100)
	})

	it('A ce stade, on doit pouvoir cliquer sur \'affiner\'', (done) => {
		app.find('#show-advanced').simulate('click')
		expect(
			app.find('#conversation .form-header h1').text()
		).to.contain('complémentaire santé')
		done()
	})

	it('Puis mettre à jour la simulation en répondant à la première question d\'affinage', (done) => {
		app.find('.answer input').first().simulate('change', {target: {value: '100000'}})
		setTimeout(() => {
			expect(nodeToNumber(app.find('.figure').first())).to.be.above(50000) // une mutuelle onéreuse :o
			done()
		}, 1000)
	})

	it('Voir une nouvelle question après avoir validé la première<', (done) => {
		app.find('.send').first().simulate('click')
		expect(
			app.find('#conversation .form-header h1').last().text()
		).to.contain('risque')
		done()
	})

  //   ;
  //   expect(wrapper.props().bar).to.equal("baz");
  //   wrapper.setProps({ bar: "foo" });
  //   expect(wrapper.props().bar).to.equal("foo");
  // });
	//
  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = mount(
  //     <Foo onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });

});
