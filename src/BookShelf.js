import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'



const BookShelf =(props) => {

  const { query, books, results, title, onUpdateShelf, onRefreshSearch} = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {title === 'Search Results' ?
          <ol className="books-grid">
          {books.map((book)=> (
            <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} onRefreshSearch={onRefreshSearch} title="In Collection" shelf={book.shelf} inList='in-list' query={query}/>
          ))}
          {results.map((book)=> (
            <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} onRefreshSearch={onRefreshSearch} title={title} shelf='none' query={query}/>
            ))}
          </ol>
          :
          <ol className="books-grid">
          {books.map((book)=> (
            <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} title={title} onRefreshSearch={onRefreshSearch} shelf={book.shelf} query={query}/>
          ))}
          </ol>
        }
      </div>
    </div>
    )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default BookShelf
