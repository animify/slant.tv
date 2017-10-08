import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'
import BaseComponent from './common/BaseComponent'
import apiKey from 'json!./../../key.json'

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
      url: `//www.omdbapi.com/?i=${imdbID}&plot=full&r=json&apikey=${apiKey.apiKey}`,
      success: function loadDataSuccess(data) {
        if (data.Response == "False") return this.context.router.push('/')
        $.get(`//yts.ag/api/v2/list_movies.json?sort=seeds&query_term=${data.imdbID}`, (torrent) => {
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

    const imdbRating = movie.imdbRating != "N/A" ? `${movie.imdbRating}/10` : movie.imdbRating;
    const newStyle = { backgroundImage : "url(" + movie.Background + ")" };

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
              <figure className="movie_poster"><img src={((movie.Poster != "N/A") ? movie.Poster : "/images/n-a.jpg")}/></figure>
              <a href={movie.Website} className="button block primary">Official website</a>
              <a href={`//www.imdb.com/title/${movie.imdbID}/`} className="button block black">More on IMDB</a>
              {this.state.torrentURL ? <a rel="noopener noreferrer" target="_blank" href={this.state.torrentURL} download className="button block default">Download torrent via. Yify</a> : null}
            </div>
            <div className="xs-12 m-9">

              <div className="movie_information">
                <h2 className="movie_title">{movie.Title}<span className="movie_year">({movie.Year})</span></h2>
                <p>{movie.Plot}</p>
                <small>{ `${imdbRating} | ${movie.Rated} | ${movie.Runtime} | ${movie.Genre} | ${movie.Released} (${movie.Country})`}</small>
              </div>

              <div className="grid-row movie_desc">
                <div className="xs-12 m-4">
                  <div className="movie_block">
                    <h5 className="movie_sub side">Genres</h5>
                    <p>{movie.Genre}</p>
                  </div>
                  <div className="movie_block rating">
                    <div className="grid-row">
                      <div className="xs-6">
                        <h5 className="movie_sub side">Rating</h5>
                        <p>{movie.imdbRating != "N/A" ? `${movie.imdbRating}/10` : movie.imdbRating}</p>
                      </div>
                      <div className="xs-6">
                        <h5 className="movie_sub side">Votes</h5>
                        <p>{movie.imdbVotes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="movie_block">
                    <h5 className="movie_sub side">Awards</h5>
                    <p>{movie.Awards}</p>
                  </div>
                </div>
                <div className="xs-12 m-8">

                  <div className="movie_block">
                    <div className="grid-row">
                      <div className="xs-6">
                        <h5 className="movie_sub">Language</h5>
                        <p>{movie.Language}</p>
                      </div>
                      <div className="xs-6">
                      <h5 className="movie_sub">Runtime</h5>
                      <p>{movie.Runtime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="movie_block">
                    <h5 className="movie_sub">Full description</h5>
                    <p>{movie.Plot}</p>
                  </div>
                  <div className="movie_block">
                    <h5 className="movie_sub">Actors</h5>
                    <p>{movie.Actors}</p>
                  </div>
                  <div className="movie_block">
                    <h5 className="movie_sub">Director</h5>
                    <p>{movie.Director}</p>
                  </div>
                  <div className="movie_block">
                    <h5 className="movie_sub">Writer</h5>
                    <p>{movie.Writer}</p>
                  </div>
                  <div className="movie_block">
                    <h5 className="movie_sub">Rated</h5>
                    <p>{movie.Rated}</p>
                  </div>
                  <div className="movie_block type">
                    <h5 className="movie_sub">Cinematic Type</h5>
                    <p>{movie.Type == 'movie' ? movie.Type : movie.Type + ` - ${movie.totalSeasons} Seasons`}</p>
                  </div>
                  <div className="movie_block">
                    <h5 className="movie_sub">Release Date</h5>
                    <p>{movie.Released}</p>
                  </div>
                  <a href={`//www.imdb.com/title/${movie.imdbID}/`} className="button block black">More on IMDB</a>

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
