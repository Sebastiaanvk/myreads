import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


export default class BookShelf extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, results, title, onUpdateShelf, onRefreshSearch} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {title === 'Search Results' ?
            <ol className="books-grid">
            {books.map((book)=> (
              <Book book={book} onUpdateShelf={onUpdateShelf} onRefreshSearch={onRefreshSearch} shelf={book.shelf} inList='in-list'/>
            ))}
            {results.map((book)=> (
              <Book book={book} onUpdateShelf={onUpdateShelf} onRefreshSearch={onRefreshSearch} title={title} shelf='none'/>
              ))}
            </ol>
            :
            <ol className="books-grid">
            {books.map((book)=> (
              <Book book={book} onUpdateShelf={onUpdateShelf} shelf={book.shelf}/>
            ))}
            </ol>
          }
        </div>
      </div>
      )
  }
}
