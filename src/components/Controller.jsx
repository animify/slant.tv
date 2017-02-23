import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'
import NewSearch from './NewSearch'
import NavBar from './NavBar'
import NavFooter from './NavFooter'
import DisplayResults from './DisplayResults'
import DisplayID from './DisplayID'
import HomeSearch from './HomeSearch'

const keyMap = {
	'savePaste': ['command+s', 'ctrl+s']
}

class Controller extends BaseComponent {
	constructor() {
		super()
		this._bind('init')

		this.state = {
			searchFor: null
		}
	}

	init() {
		this.setState({searchFor: this.props.params.id})
	}

	componentWillMount() {
		this.init()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({searchFor: nextProps.params.id})
	}

	render() {
		const handlers = {
			'savePaste': (event) => {
				event.preventDefault()
				console.debug('Paste: saving')
				this.handleSave()
			}
		}

console.log(this.props.route.home);
		return (
			<div>
				{!this.props.route.home ? <NavBar/> : null}
				{this.props.route.home ? <HomeSearch/> : ((this.props.route.results) ? <DisplayResults resultsFor={this.state.searchFor}/> : <DisplayID imdbID={this.props.params.id}/>)}
				{!this.props.route.home ? <NavFooter/> : null}
			</div>
		)
	}
}

Controller.contextTypes = {
	router: React.PropTypes.object
}

Controller.propTypes = {
	location: React.PropTypes.object,
	url: React.PropTypes.string
}

export default Controller
