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
import ReactGA from 'react-ga'

ReactGA.initialize('UA-96109390-1')

function logPageView() {
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
<Router history={browserHistory} onUpdate={logPageView}>
	<Route path="/" component={Controller} addHandlerKey={true} home={true} />
	<Route path="/search/:id" component={Controller} addHandlerKey={true} results={true}/>
	<Route path="/id/:id" component={Controller} addHandlerKey={true} show={true}/>
	<Route path="*" component={PageNotFound} />
</Router>, document.getElementById('main'))
