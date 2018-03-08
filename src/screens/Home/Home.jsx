import React, { Component } from 'react'

import Shelf from '../../components/Shelf/Shelf'

export default class Home extends Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>

				<div className="list-books-content">
					<div>
						<Shelf/>
						<Shelf/>
					</div>
				</div>

				<div className="open-search">
					<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
				</div>
			</div>
		)
	}
}
