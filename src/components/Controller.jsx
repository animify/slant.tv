import React from 'react';
import BaseComponent from './common/BaseComponent';
import NavBar from './NavBar';
import NavFooter from './NavFooter';
import DisplayResults from './DisplayResults';
import DisplayID from './DisplayID';
import HomeSearch from './HomeSearch';

class Controller extends BaseComponent {
  constructor() {
    super();
    this._bind('init');

    this.state = {
      searchFor: null,
    };
  }

  init() {
    this.setState({ searchFor: this.props.params.id });
  }

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchFor: nextProps.params.id });
  }

  render() {
    return (
<div>
	{!this.props.route.home ? <NavBar /> : null}
{this.props.route.home ? <HomeSearch /> : ((this.props.route.results) ? <DisplayResults resultsFor={this.state.searchFor} /> : <DisplayID imdbID={this.props.params.id} />)}
	{!this.props.route.home ? <NavFooter /> : null}
</div>
);
  }
}

export default Controller;
