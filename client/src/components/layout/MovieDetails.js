import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MovieDetails = ({ movie }) => {
  return (
    <div>
      <h2>
        {movie.name
          ? movie.name
          : movie.title
          ? movie.title
          : movie.original_title
          ? movie.original_title
          : movie.original_name}
      </h2>
      <img
        src={`https://image.tmdb.org/t/p/original${
          movie.backdrop_path ? movie.backdrop_path : movie.image
        }`}
        alt=''
      />
      <p>{movie.overview}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movie.movieLoaded,
});

MovieDetails.propTypes = {};

export default connect(mapStateToProps, {})(MovieDetails);
