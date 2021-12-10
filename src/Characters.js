import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDna, faGlobe, faMars, faVenus, faGenderless, faUserTag, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import SearchForm from './SearchForm';
import FetchCharacters from './FetchCharacters';

class Characters extends Component {

  constructor(props) {
    super(props);
    this.state = { results: this.loadingMessage() }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSetPagination = this.handleSetPagination.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  loadingMessage() {
    return(
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-item-center">
          <h2 className="text-muted">Loading...</h2>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ results: <FetchCharacters rFilter={this.handleFilter} pagination={this.handleSetPagination} /> })
  }

  handleFilter(filter) {
    this.setState({  results: <FetchCharacters rFilter={this.handleFilter} filter={filter} pagination={this.handleSetPagination} /> });
  }

  handleSearch(keyword) {
    this.setState({  results: <FetchCharacters rFilter={this.handleFilter} filter={['name', keyword]} pagination={this.handleSetPagination} /> });
  }

  handlePagination(page) {
    this.setState({  results: <FetchCharacters rFilter={this.handleFilter} pagination={this.handleSetPagination} page={page}/> });
  }

  handleSetPagination(pagination) {

    let navPrev = (pagination.prev) ? '' : 'disabled';
    let currentPage = parseInt(pagination.next - 1) + ' of ' + pagination.pages;
    let navNext = (pagination.next) ? '' : 'disabled';

    const setPagination = () => {

      return(
        <div className="mb-5 mt-5">
          <nav id="pagination">
            <ul class="pagination justify-content-center">
              <li class={'page-item ' + navPrev}>
                <a class="page-link" href="#" onClick={ () => this.handlePagination(pagination.prev) }>Previous</a>
              </li>

              <li class="page-item disabled">
                <span class="page-link">{currentPage}</span>
              </li>

              <li class={'page-item ' + navNext}>
                <a class="page-link" href="#" onClick={ () => this.handlePagination(pagination.next) }>Next</a>
              </li>
            </ul>
          </nav>
        </div>
      )
    }

    this.setState({
      paginationNav: setPagination()
    })

  }

  render() {
    return(
      <>
        <SearchForm sendKeyWordToParent={this.handleSearch}></SearchForm>
        {this.state.results}
        {this.state.paginationNav}
      </>
    )
  }
}

export default Characters
