import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './screens/Home/Home'
import Search from './screens/Search/Search'


class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
