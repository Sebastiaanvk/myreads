import React from 'react'

const Book = (props) => {

  const setThumbnail = (book) => {
    const cover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://i2.wp.com/theava.com/wp-content/uploads/2014/11/VantreeseNoPic.jpg?resize=128%2C193";
    return cover
  }

  const handleChange = (event) => {
    const {query, book, title, onUpdateShelf, onRefreshSearch} = props
    onUpdateShelf(book, event.target.value, title);
    if(title === 'Search Results' || title === 'In Collection') {
      onRefreshSearch(query)
    };
  }

  const { book, shelf, inList} = props
  return (
    <li key={book.id + book.title} className={inList}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${setThumbnail(book)})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={handleChange}>
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

export default Book
