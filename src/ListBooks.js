import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


export default class ListBooks extends React.Component {

  render() {

    const { books } = this.props
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
            <BookShelf books={ currentlyReadingBooks } title='Currently Reading'/>
            <BookShelf books={ wantToReadBooks } title='Want To Read'/>
            <BookShelf books={ readBooks } title='Read' />
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
