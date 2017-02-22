import 'style!./styl/blossom.styl'

import React from 'react'
window.React = React

import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import browserHistory from 'react-router/lib/browserHistory'
import Redirect from 'react-router/lib/Redirect'

import Controller from './components/Controller'
import PageNotFound from './components/PageNotFound'

ReactDOM.render(
	<Router history={browserHistory}>
	<Route path="/" component={Controller} />
	<Route path="/search/:id" component={Controller} addHandlerKey={true} results={true}/>
	<Route path="/id/:id" component={Controller} addHandlerKey={true} show={true}/>
	<Route path="*" component={PageNotFound} />
</Router>, document.getElementById('main'))
