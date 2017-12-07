import React from 'react'

export default class Book extends React.Component {

  setThumbnail = (book) => {
    const cover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://i2.wp.com/theava.com/wp-content/uploads/2014/11/VantreeseNoPic.jpg?resize=128%2C193";
    return cover
  }

  handleChange = (event) => {
    const {query, book, title, onUpdateShelf, onRefreshSearch} = this.props
    onUpdateShelf(book, event.target.value, title);
    title === 'Search Results' && (
      onRefreshSearch(query)
    );
  }

  render() {
    const { book, shelf, inList} = this.props
    return (
      <li key={book.id + book.title} className={inList}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.setThumbnail(book)})` }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.handleChange}>
                <option value="move-to" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    )
  }
}
