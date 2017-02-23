import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'

import BaseComponent from './common/BaseComponent'

class DisplayResults extends BaseComponent {
	constructor() {
		super()
		this._bind('loadSearch')
		this.state = {
			resultsFor: null,
			searchResults: null
		}
	}

	componentWillMount() {
		this.setState({resultsFor: this.props.resultsFor})
	}

	componentDidMount() {
		this.loadSearch()
		document.getElementById('search').value = this.props.resultsFor
	}

	componentDidUpdate(nextProps) {
		if (nextProps.resultsFor != this.state.resultsFor) this.loadSearch()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({resultsFor: nextProps.resultsFor})
	}

	loadSearch() {
		const resultsFor = this.state.resultsFor

		$.ajax({
			url: `http://www.omdbapi.com/?s=${resultsFor}`,
			success: function loadDataSuccess(data) {
				this.setState({searchResults: data.Search})
			}.bind(this)
		})
	}


	render() {
		const obj = this.state.searchResults
		var objArr = []
		$.each(obj, function(idx, movie) {
			const newStyle = {backgroundImage : "url(" + ((movie.Poster != "N/A") ? movie.Poster : "/images/n-a.jpg") + ")"}
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
			)
		})
		return (
			<div className="inner contain">
				<h2>Search results: <b>{this.state.resultsFor}</b></h2>
				<div className="grid-row">
					{objArr}
				</div>
			</div>
		)
	}
}

DisplayResults.contextTypes = {
	router: React.PropTypes.object,
	location: React.PropTypes.object
}

DisplayResults.propTypes = {
	display: React.PropTypes.object,
	resultsFor: React.PropTypes.string
}

export default DisplayResults
