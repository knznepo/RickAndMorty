import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const SearchForm = ({ sendKeyWordToParent }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendKeyWordToParent(keyword);
  }

  return(
    <div className="container mt-5">
      <header className="text-center mt-4 mb-4">
        <h1>Wubalubadubdub</h1>
        <p class="text-muted">Search characters from rick and morty. This is made with react js and graphql</p>
      </header>

      <form id="search-form" onSubmit={handleSubmit}>
        <div className="input-group shadow-sm">
          <button className="btn btn-outline-secondary border-2" type="button" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          <input type="text" className="form-control border-2" value={keyword} placeholder="Ex. Morty" onChange={e => setKeyword(e.target.value)} />
        </div>
      </form>
    </div>
  )
}

export default SearchForm
