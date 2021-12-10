import React from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDna, faGlobe, faMars, faVenus, faGenderless, faUserTag, faHeartbeat } from '@fortawesome/free-solid-svg-icons'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

const FetchCharacters = ({ rFilter, filter, pagination, page }) => {

  let characterfilter = 'characters';
  if ( page ) characterfilter = `characters(page: ${page})`;

  if ( filter ) {
    let filterPage = ( page ) ? `page: ${page},` : '';
    if ( filter.length > 1) {
      characterfilter = `characters(${filterPage} filter: { ${filter[0]} : "${filter[1]}"} )`;
    }
  }

  const GET_CHARACTERS = gql`
    query {
      ${characterfilter} {
        info {
          count
          pages
          next
          prev
        }
        results {
          name
          image
          status
          species
          origin {
            name
          }
          gender
          type
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return(
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-item-center">
          <h2 className="text-muted">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) return <p>Error :(</p>;

  // send data to parent
  pagination(data.characters.info);

  const handleFilter = (key, val) => {
    rFilter([key, val]);
  }

  const results = data.characters.results.map((i, index) => {
    let genderIcon = faMars;

    if ( i.gender == 'Male' ) {
      genderIcon = faMars;
    } else if ( i.gender == 'Female' ) {
      genderIcon = faVenus;
    } else {
      genderIcon = faGenderless
    }

    let userType = '';

    if ( i.type ) {
      userType = <span className="d-block"><FontAwesomeIcon icon={faUserTag} /> {i.type}</span>
    }

    return (
      <div className="grid-item shadow-sm" key={index}>
        <div className="card">
          <div className="card-image">
            <img src={i.image} alt={i.name}></img>
          </div>
          <div className="card-body">
            <h4 class="mb-0"><strong>{i.name}</strong></h4>

            <div className="character-details">
              <div className="xd-grid xgrid-2">
                <span className="d-block"><FontAwesomeIcon icon={faGlobe} /> {i.origin.name}</span>
                <span className="d-block"><a href="#" onClick={() => handleFilter('status', i.status)}><FontAwesomeIcon icon={faHeartbeat} /> {i.status}</a></span>
                <span className="d-block"><a href="#" onClick={() => handleFilter('species', i.species)}><FontAwesomeIcon icon={faDna} /> {i.species}</a></span>
                <span className="d-block"><a href="#" onClick={() => handleFilter('gender', i.gender)}><FontAwesomeIcon icon={genderIcon} /> {i.gender}</a></span>
                { userType }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="container-fluid mt-5 mb-5">
      <div className="d-grid grid-4">
        {results}
      </div>
    </div>
  )
}

export default FetchCharacters
