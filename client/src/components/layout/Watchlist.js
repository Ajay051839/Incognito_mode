import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies } from '../../actions/movie';
import Movies from './Movies';

const Watchlist = ({ setMovies }) => {
  useEffect(() => {
    async function call() {
      const res = await axios.get('/api/watchlist');
      console.log(res);
      setMovies(res.data[0]?.movies);
    }
    call();
  }, []);

  return (
    <div>
      <Movies />
    </div>
  );
};

Watchlist.propTypes = {};

export default connect(null, { setMovies })(Watchlist);
