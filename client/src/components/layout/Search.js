import React from 'react';
import PropTypes from 'prop-types';
import { setMovies } from '../../actions/movie';
import { connect } from 'react-redux';
import Movies from './Movies';

const Search = ({ setMovies }) => {
  const handleClick = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=b219d5633bef962f549e1aa30a853381&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className='input-group rounded'>
        <input
          type='search'
          id='search_bar'
          className='form-control rounded'
          placeholder='Search'
          aria-label='Search'
          aria-describedby='search-addon'
          //   onChange={(e) => {
          //     handleChange(e);
          //   }}
        />
        <button
          className='btn btn-primary'
          onClick={(e) =>
            handleClick(document.getElementById('search_bar').value)
          }
        >
          Search
        </button>
      </div>
      <Movies />
    </div>
  );
};

Search.propTypes = {};

export default connect(null, { setMovies })(Search);
