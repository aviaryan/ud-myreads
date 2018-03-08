import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { search, update } from '../../BooksAPI'
import Book from '../../components/Book/Book'

export default class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: []
		}
	}

	doSearch(term){
		if (!term){
			this.setState({books: []})
			return;
		}
		search(term).then((books) => {
			console.log('search done')  // again takes a lot of time so
			this.setState({books: books})
		}).catch (() => {
			console.log('search failed')
			this.setState({books: []})
			// happens sometimes, maybe on invalid terms
			// REQ: Invalid queries are handled and prior search results are not shown.
		})
	}

	inputChange(evt){
		const term = evt.target.value.trim()
		this.doSearch(term)
	}

	updateHandler(book, shelf) {
		this.updateBook(book, shelf)
		update(book, shelf).then(() => console.log('Book update done'))
		// ^ takes a lot of time so better for checking
	}

	updateBook(book, shelf) {
		let books = this.state.books;
		books.forEach((oldBook, ind) => {
			if (oldBook.id === book.id) {
				books[ind].shelf = shelf
			}
		})
		this.setState({ books: books })
	}

	render() {
		let books = this.state.books.map((book) => (
			<Book key={book.id} {...book} handler={this.updateHandler.bind(this)} />
		))
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input onChange={this.inputChange.bind(this)} type="text" 
							placeholder="Search by title or author" />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books}
					</ol>
				</div>
			</div>
		)
	}
}
