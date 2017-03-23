import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'

import BaseComponent from './common/BaseComponent'

class DisplayResults extends BaseComponent {
	constructor(props) {
		super(props)
		this._bind('loadID')

		this.state = {
			imdbID: props.imdbID,
			titleResults: []
		}
	}

	componentDidMount() {
		$('body').addClass('adaptive')
		this.loadID()
		window.scrollTo(0, 0)
	}

	componentWillUnmount() {
		$('body').removeClass('adaptive').attr('style', null)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({imdbID: nextProps.imdbID})
	}

	loadID() {
		const imdbID = this.state.imdbID

		$.ajax({
			url: `http://www.omdbapi.com/?i=${imdbID}&plot=full&r=json`,
			success: function loadDataSuccess(data) {
				if (data.Response == "False") return this.context.router.push('/')
				$.get(`https://yts.ag/api/v2/list_movies.json?sort=seeds&query_term=${data.imdbID}`, (torrent) => {
					var newState = ''
					torrent.data.movie_count == 0 ? newState = {titleResults: data} : newState = {titleResults: data, torrentURL: torrent.data.movies[0].torrents[0].url, background: torrent.data.movies[0].background_image_original}
					this.setState(newState)
				})
			}.bind(this)
		})
	}

	render() {
		const movie = this.state.titleResults
		const bg = this.state.background
		if (bg != null)
			movie.Background = bg
			else if (movie.Poster)
			movie.Background = movie.Poster.replace('SX300', 'SX800')


		const newStyle = {backgroundImage : "url(" + movie.Background + ")"}

		return (
			<div>
				<div className="nooverflow">
					<div className="poster" style={newStyle}>
						<div className="poster-overlay"/>
					</div>
				</div>
				<div className="inner contain">
					<div className="grid-row display_movie">
						<div className="xs-12 m-3">
							<figure className="m0_poster"><img src={((movie.Poster != "N/A") ? movie.Poster : "/images/n-a.jpg")}/></figure>
							<a href={`http://www.imdb.com/title/${movie.imdbID}/`} className="button block black">More on IMDB</a>
							{this.state.torrentURL ? <a href={this.state.torrentURL} download className="button block default">Download torrent via. Yify</a> : null}
						</div>
						<div className="xs-12 m-9">
							<h3 className="m0_title">{movie.Title}<span className="m0_year">({movie.Year})</span></h3>
							<div className="grid-row m0_desc">
								<div className="xs-12 m-4">
									<div className="m0_block">
										<h5 className="m0_sub side">Genres</h5>
										{movie.Genre}
									</div>
									<div className="m0_block rating">
										<div className="grid-row">
											<div className="xs-6">
												<h5 className="m0_sub side">Rating</h5>
												{movie.imdbRating != "N/A" ? `${movie.imdbRating}/10` : movie.imdbRating}
											</div>
											<div className="xs-6">
												<h5 className="m0_sub side">Votes</h5>
												{movie.imdbVotes}
											</div>
										</div>
									</div>

									<div className="m0_block">
										<h5 className="m0_sub side">Awards</h5>
										{movie.Awards}
									</div>
								</div>
								<div className="xs-12 m-8">

									<div className="m0_block">
										<div className="grid-row">
											<div className="xs-6">
												<h5 className="m0_sub">Language</h5>
												{movie.Language}
											</div>
											<div className="xs-6">
											<h5 className="m0_sub">Runtime</h5>
											{movie.Runtime}
											</div>
										</div>
									</div>

									<div className="m0_block">
										<h5 className="m0_sub">Full description</h5>
										{movie.Plot}
									</div>
									<div className="m0_block">
										<h5 className="m0_sub">Actors</h5>
										{movie.Actors}
									</div>
									<div className="m0_block">
										<h5 className="m0_sub">Director</h5>
										{movie.Director}
									</div>
									<div className="m0_block">
										<h5 className="m0_sub">Writer</h5>
										{movie.Writer}
									</div>
									<div className="m0_block">
										<h5 className="m0_sub">Rated</h5>
										{movie.Rated}
									</div>
									<div className="m0_block type">
										<h5 className="m0_sub">Cinematic Type</h5>
										{movie.Type == 'movie' ? movie.Type : movie.Type + ` - ${movie.totalSeasons} Seasons`}
									</div>
									<div className="m0_block">
										<h5 className="m0_sub">Release Date</h5>
										{movie.Released}
									</div>
									<a href={`http://www.imdb.com/title/${movie.imdbID}/`} className="button block black">More on IMDB</a>

								</div>
							</div>
							</div>
					</div>
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
	imdbID: React.PropTypes.string
}

export default DisplayResults
