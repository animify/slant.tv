import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import NavFooter from './NavFooter';

class HomeSearch extends BaseComponent {
  constructor() {
    super();
    this._bind('handleKeyPress', 'goToSearch');
  }

  componentWillMount() {
    $('body').addClass('search');
    $('#main').addClass('cover');
  }

  componentWillUnmount() {
    $('body').removeClass('search');
    $('#main').removeClass('cover');
  }

  goToSearch() {
    const searchEle = document.getElementById('r-search');
    if (searchEle) {
      if (searchEle.value !== '') {
        this.context.router.push(`/search/${document.getElementById('r-search').value}`);
      } else {
        $('#r-search').addClass('error').delay(3000).queue(() => {
          $(this).removeClass('error').dequeue();
        });
      }
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.goToSearch();
    }
  }

  render() {
    return (
      <div className="contain bind search">
        <div className="home-search bind">
          <div className="align-search">
            <div className="logo"><img src="/assets/images/slant-logo.svg" /></div>
            <input id="r-search" type="text" placeholder="Search for a movie or series..." onKeyPress={this.handleKeyPress} />
            <a className="button outlined" onClick={this.goToSearch}>Explore content</a>
          </div>
          <NavFooter />
        </div>
      </div>
    );
  }
}

export default HomeSearch;
