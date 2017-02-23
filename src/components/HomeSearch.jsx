import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'

import BaseComponent from './common/BaseComponent'
import NavFooter from './NavFooter'

class HomeSearch extends BaseComponent {
	constructor() {
		super()
		this._bind('handleKeyPress', 'goToSearch')
	}

	componentWillMount() {
		$('body').addClass('search')
	}

	componentWillUnmount() {
		$('body').removeClass('search')
	}

	goToSearch () {
		const searchEle = document.getElementById('r-search')
		if (searchEle) {
			if (searchEle.value != '') {
				this.context.router.push(`/search/${document.getElementById('r-search').value}`)
			} else {
				$('#r-search').addClass('error').delay(3000).queue(function(){
					$(this).removeClass("error").dequeue();
				})
			}
		}
	}

	handleKeyPress (event) {
		if(event.key == 'Enter') {
			this.goToSearch()
		}
	}

	render() {
		return (
			<div className="contain bind search">
				<div className="home-search bind">
					<div className="align-search">
						<div className="logo"><img src="/images/logo_large.png"/></div>
						<input id="r-search" type="text" placeholder="Search for a movie or series..." onKeyPress={this.handleKeyPress}/>
						<a className="button outlined" onClick={this.goToSearch}>Search content</a>
					</div>
					<NavFooter/>
				</div>
			</div>
		)
	}
}

HomeSearch.contextTypes = {
	router: React.PropTypes.object,
	location: React.PropTypes.object
}

HomeSearch.propTypes = {
}

export default HomeSearch
