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
    if(this.isBookInCollection(book)) {
      let bookIndex = this.state.books.findIndex(function(c) {
        return c.id === book.id
      })
      let newBooks = this.state.books
      newBooks[bookIndex].shelf = newShelf
      this.setState({ books: newBooks})
      BooksAPI.update(book, newShelf)
    }else{
      book.shelf = newShelf
      this.setState(state => ({
        books: state.books.concat([book])
      }))
    }
  }

  isBookInCollection(newBook) {
    this.state.books.forEach(function(book) {
      if(newBook.id === book.id){
        return true
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <Search
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path='/' render={()=>(
          <ListBooks
            onUpdateShelf={this.updateShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
