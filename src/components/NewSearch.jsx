import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'

class NewSearch extends BaseComponent {
	constructor() {
		super()
	}

	componentDidMount() {
	}


	render() {
		return (
			<div>
			</div>
		)
	}
}

NewSearch.contextTypes = {
	router: React.PropTypes.object,
}

export default NewSearch
