import React from 'react'
import PropTypes from 'prop-types'


export default class BookShelf extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  setThumbnail = (book) => {
    const cover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://i2.wp.com/theava.com/wp-content/uploads/2014/11/VantreeseNoPic.jpg?resize=128%2C193";
    return cover
  }

  render() {
    const { books, title, onUpdateShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map((book)=> (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.setThumbnail(book)})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => {onUpdateShelf(book, event.target.value)}}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
            ))}
          </ol>
        </div>
      </div>
      )
  }
}
