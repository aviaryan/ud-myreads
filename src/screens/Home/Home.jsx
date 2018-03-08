import React, { Component } from 'react'

import Shelf from '../../components/Shelf/Shelf'
import {getAll} from '../../BooksAPI'


export default class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			books: []
		}
	}

	componentDidMount(){
		this.fetchBooks()
	}

	fetchBooks(){
		getAll().then((data) => {
			this.setState({books: data})
		})
	}

	filterBooksByShelf(shelf){
		return this.state.books.filter((book) => book.shelf === shelf)
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>

				<div className="list-books-content">
					<div>
						<Shelf caption="Currently Reading" books={this.filterBooksByShelf('currentlyReading')}/>
						<Shelf caption="Want to Read" books={this.filterBooksByShelf('wantToRead')}/>
						<Shelf caption="Read" books={this.filterBooksByShelf('read')}/>
					</div>
				</div>

				<div className="open-search">
					<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
				</div>
			</div>
		)
	}
}
