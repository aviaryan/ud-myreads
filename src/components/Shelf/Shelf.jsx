import React, { Component } from 'react'

import Book from '../Book/Book'


export default class Shelf extends Component {
	render() {
		let books = this.props.books.map((book) => (
			<Book key={book.id} {...book} handler={this.props.handler}/>
		))
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.caption}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books}
					</ol>
				</div>
			</div>
		)
	}
}
