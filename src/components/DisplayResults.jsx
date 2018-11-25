import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import BaseComponent from './common/BaseComponent';
import apiKey from './../../key.json';

class DisplayResults extends BaseComponent {
  constructor() {
    super();
    this._bind('loadSearch');
    this.state = {
      resultsFor: null,
      searchResults: null,
    };
  }

  componentWillMount() {
    this.setState({ resultsFor: this.props.resultsFor });
  }

  componentDidMount() {
    this.loadSearch();
    document.getElementById('search').value = this.props.resultsFor;
    window.scrollTo(0, 0);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.resultsFor !== this.state.resultsFor) this.loadSearch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ resultsFor: nextProps.resultsFor });
  }

  loadSearch() {
    const resultsFor = this.state.resultsFor;
    $.ajax({
      url: `https://www.omdbapi.com/?s=${resultsFor}&apikey=${apiKey.apiKey}`,
      success: function loadDataSuccess(data) {
        this.setState({ searchResults: data.Search });
      }.bind(this),
    });
  }


  render() {
    const obj = this.state.searchResults || {};
    const objArr = [];

    if (obj.length === undefined) {
      objArr.push(
        <div className="xs-12 no_results" key="no-results">
          <img src="/images/no_results.png" />
          <h2>No results</h2>
          <h5>Your search returned no results</h5>
        </div>
      );
    } else {
      $.each(obj, (idx, movie) => {
        const newStyle = {
          backgroundImage: `url(${((movie.Poster !== 'N/A') ? movie.Poster : '/images/n-a.jpg')})`,
        };
        objArr.push(
          <Link to={`/id/${movie.imdbID}`} key={idx} className="xs-6 m-4 l-3 movie">
            <figure>
              <div className="poster" style={newStyle}></div>
              <div className="desc">
                <div className="desc-inner">
                  <h4 className="title">{movie.Title}</h4>
                  <h6 className="year">{movie.Year}</h6>
                </div>
              </div>
            </figure>
          </Link>
        );
      });
    }
    return (
      <div className="inner contain">
        <h2>Search results: <b>{this.state.resultsFor}</b></h2>
        <div className="grid-row">
          {objArr}
        </div>
      </div>
    );
  }
}

export default DisplayResults;
