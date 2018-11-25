import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import Controller from './components/Controller';
import PageNotFound from './components/PageNotFound';
import './styl/blossom.styl';

ReactGA.initialize('UA-96109390-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
<Router onUpdate={logPageView}>
	<Switch>
		<Route exact path="/" component={Controller} addHandlerKey home />
		<Route path="/search/:id" component={Controller} addHandlerKey results />
		<Route path="/id/:id" component={Controller} addHandlerKey show />
		<Route path="*" component={PageNotFound} />
	</Switch>
</Router>, document.getElementById('main'));
