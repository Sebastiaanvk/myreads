import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


export default class Search extends React.Component {

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (e) => {
    let query = e.target.value
    this.setState({query: query})
    this.searchBooks()
  }

  searchBooks = () => {
    BooksAPI.search(this.state.query).then((results)=>{
        if(typeof results !== 'undefined'){
        this.setState({searchResults: this.filterResults(results)})
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  filterResults = (results) => {
    let books  = this.props.books
    let newResults = results
    books.forEach(function(book) {
      newResults = newResults.filter((result) => result.title !== book.title)
    })
    return newResults
  }

  render() {
    const { onUpdateShelf } = this.props
    const { query, searchResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
            >Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
                   placeholder="Search by title or author"
                   onChange={this.updateQuery}
                   value={query}/>
          </div>
        </div>
        {searchResults.length > 0 && (
        <div className='search-books-results'>
          <BookShelf books={ searchResults } title='Search Results' onUpdateShelf={ onUpdateShelf }/>
        </div>
        )}
      </div>
      )
  }
}
