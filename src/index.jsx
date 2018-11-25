import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
<BrowserRouter onUpdate={logPageView}>
	<Switch>
		<Route exact path="/" render={(props) => (<Controller {...props} addHandlerKey home />)} />
		<Route path="/search/:id" render={(props) => (<Controller {...props} addHandlerKey results />)} />
		<Route path="/id/:id" render={(props) => (<Controller {...props} addHandlerKey show />)} />
		<Route path="*" component={PageNotFound} />
	</Switch>
</BrowserRouter>, document.getElementById('main'));
