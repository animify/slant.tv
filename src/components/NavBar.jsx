import React from 'react'
import Link from 'react-router/lib/Link'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'

class NavBar extends BaseComponent {
	constructor() {
		super()
		this._bind('handleKeyPress')
	}

	handleKeyPress (event) {
		if(event.key == 'Enter') {
			console.debug('Event: enter')
			console.debug('Redirecting')
			this.context.router.push(`/search/${document.getElementById('search').value}`)
		}
	}

	render() {
		return (
			<nav className="sidebar">
				<ul>
					<li className="logo"><img src="/images/logo.png"/></li>
					<li className="search"><i className="ion-ios-search-strong"/><input id="search" onKeyPress={this.handleKeyPress} placeholder="Search for a movie..." type="text"/></li>
				</ul>
			</nav>
		)
	}
}

NavBar.contextTypes = {
	router: React.PropTypes.object,
	location: React.PropTypes.object
}

export default NavBar
