import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'
import NewSearch from './NewSearch'
import NavBar from './NavBar'
import DisplayResults from './DisplayResults'
import DisplayID from './DisplayID'

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

		return (
			<div>
				<NavBar displayType={this.props.route.results ? true : false}/>
				{this.props.route.results ? <DisplayResults resultsFor={this.state.searchFor}/> : <DisplayID imdbID={this.props.params.id}/>}
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
