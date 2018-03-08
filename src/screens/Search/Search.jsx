import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { search, update, getAll } from '../../BooksAPI'
import Book from '../../components/Book/Book'

export default class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			reqCount: 0,
			maxReq: 0,
			allBooks: []
		}
	}

	componentDidMount() {
		this.fetchBooks()
	}

	fetchBooks() {
		getAll().then((data) => {
			console.log('all books loaded')
			this.setState({ allBooks: data })
		})
	}

	setSearchState(books, curReq){
		if (curReq < this.state.maxReq){
			console.log('a response was invalidated')
			// old request, invalidate
			return;
		}
		this.setState({books: books, maxReq: curReq})
	}

	doSearch(term){
		// attaching IDs to request, to solve async stale data issues
		let curReq = this.state.reqCount + 1
		this.setState({reqCount: curReq})
	
		if (!term){
			this.setSearchState([], curReq)
			return;
		}
		search(term).then((books) => {
			console.log('search done')  // again takes a lot of time so
			this.setSearchState(books, curReq)
		}).catch (() => {
			console.log('search failed')
			this.setSearchState([], curReq)
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

	// gets book from allBooks collection
	getBook(searchBook){
		let books = this.state.allBooks;
		for (let key in books){
			if (books[key].id === searchBook.id){
				console.log('match in search books and own books')
				return books[key]
			}
		}
		return searchBook
	}

	render() {
		let books = this.state.books.map((book) => (
			<Book key={book.id} {...this.getBook(book)} handler={this.updateHandler.bind(this)} />
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
