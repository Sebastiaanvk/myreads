import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import escapeRegExp from 'escape-string-regexp'


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
        this.filterResults(results)
    })
  }

  filterResults = (results) => {
    if(typeof results !== 'undefined'){
      let books  = this.props.books
      let newResults = results
      books.forEach(function(book) {
        newResults = newResults.filter((result) => result.title !== book.title)
      })
      this.setState({searchResults: newResults})
    } else {
      this.setState({searchResults: []})
    }
  }

  render() {
    const { onUpdateShelf, books } = this.props
    const { query, searchResults } = this.state
    const match = new RegExp(escapeRegExp(query), 'i')
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
          <BookShelf results={ searchResults } books={ books.filter((book) => match.test(book.title)) } title='Search Results' onUpdateShelf={ onUpdateShelf } onRefreshSearch={ this.searchBooks }/>
        </div>
        )}
      </div>
      )
  }
}
