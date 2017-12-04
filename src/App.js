import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {this.setState({ books })})
  }

  updateShelf = (book, newShelf) => {
    let bookIndex = this.state.books.findIndex(function(c) {
      return c.id === book.id
    })
    let newBooks = this.state.books
    newBooks[bookIndex].shelf = newShelf
    this.setState({ books: newBooks})
    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <Search/>
        )}/>
        <Route exact path='/' render={()=>(
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
