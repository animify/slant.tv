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
    const id = (this.props.match.params && this.props.match.params.id) || null;
    this.setState({ searchFor: id });
  }

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchFor: nextProps.match.params.id });
  }

  render() {
    return (
<div>
	{!this.props.home ? <NavBar /> : null}
{this.props.home ? <HomeSearch /> : ((this.props.results) ? <DisplayResults resultsFor={this.state.searchFor} /> : <DisplayID imdbID={this.props.match.params.id} />)}
	{!this.props.home ? <NavFooter /> : null}
</div>
);
  }
}

export default Controller;
