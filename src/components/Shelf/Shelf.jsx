import React, { Component } from 'react'

import Book from '../Book/Book'


export default class Shelf extends Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.caption}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						<Book/>
						<Book/>
					</ol>
				</div>
			</div>
		)
	}
}
