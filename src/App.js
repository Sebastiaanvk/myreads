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

  updateShelf = (book, newShelf, originShelf) => {
    if(originShelf === 'Search Results') {
      book.shelf = newShelf
      this.setState(state => ({
        books: state.books.concat([book])
      }))
      BooksAPI.update(book, book.shelf)
    }else{
      let bookIndex = this.state.books.findIndex(function(c) {
        return c.title === book.title
      })
      let newBooks = this.state.books
      if(newShelf === 'none') {
        newBooks.splice(bookIndex, 1)
        this.setState({books: newBooks})
        BooksAPI.update(book, newShelf)
      } else {
        newBooks[bookIndex].shelf = newShelf
        this.setState({ books: newBooks})
        BooksAPI.update(book, newShelf)
      }
    }
  }

  isBookInCollection(newBook) {
    this.state.books.forEach(function(book) {
      if(newBook.title === book.title){
        return true
      } else {
        return false
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
