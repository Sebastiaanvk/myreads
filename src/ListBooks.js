import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'


export default class ListBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {

    const { books, onUpdateShelf} = this.props
    console.log(books)
    let currentlyReadingBooks = books.filter((book)=> book.shelf === 'currentlyReading' )
    let wantToReadBooks = books.filter((book)=> book.shelf === 'wantToRead' )
    let readBooks = books.filter((book)=> book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {currentlyReadingBooks.length > 0 && (
            <BookShelf books={ currentlyReadingBooks } title='Currently Reading' onUpdateShelf={ onUpdateShelf }/>
            )}
            {wantToReadBooks.length > 0 && (
            <BookShelf books={ wantToReadBooks } title='Want To Read' onUpdateShelf={ onUpdateShelf }/>
            )}
            {readBooks.length > 0 && (
            <BookShelf books={ readBooks } title='Read' onUpdateShelf={ onUpdateShelf }/>
            )}
          </div>
        </div>
        <Link
          className='open-search'
          to='/search'
          >Add a book
        </Link>
      </div>
      )
  }
}
