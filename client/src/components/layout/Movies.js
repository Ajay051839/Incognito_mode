import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { setMovies, setMovie } from '../../actions/movie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

const Movies = ({ movies, setMovie }) => {
  const navigate = useNavigate();
  const handleClick = (movie) => {
    setMovie(movie);
    navigate('/movieDetails');
  };

  const handleWatchlist = async (movie) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const name = movie.title
        ? movie.title
        : movie.original_title
        ? movie.original_title
        : movie.original_name;
      const image = movie.backdrop_path;
      const body = JSON.stringify({ name, image });
      const res = await axios.put('/api/watchlist', body, config);
      console.log('Working', res);
      setAlert('Movie added to watchlist', 'success');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGroupWatchlist = (movie) => {
    setMovie(movie)
    navigate('/myGroups')
  }

  const handleChatWatchlist =  (movie) => {
    setMovie(movie);
    navigate('/chat')
  };

  const handleShareWithChat = (movie) => {
    setMovie(movie);
    navigate('/chat');
  }

  function truncate(str) {
    return str.length > 15 ? str.substring(0, 14) + '...' : str;
  }

  return (
    <div>
      <Row>
        {movies?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className='p-0 overflow-hidden h-100 shadow'>
              <div className='overflow-hidden rounded p-0 bg-dark'>
                <Card.Img
                  onClick={(e) => handleClick(movie)}
                  variant='top'
                  src={`https://image.tmdb.org/t/p/original${
                    movie.backdrop_path ? movie.backdrop_path : movie.image
                  }`}
                />
              </div>
              <Card.Body className='text-center'>
                {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                <Card.Title className='text-black'>
                  {movie.name
                    ? movie.name
                    : movie.title
                    ? movie.title
                    : movie.original_title
                    ? movie.original_title
                    : movie.original_name}
                </Card.Title>
              </Card.Body>
              <Button
                className='w-100 rounded-0'
                variant='success'
                onClick={(e) => handleWatchlist(movie)}
              >
                Add to watchlist
              </Button>
              <Button
                className='w-100 rounded-0'
                variant='success'
                onClick={(e) => handleGroupWatchlist(movie)}
              >
                Add to group watchlist
              </Button>
              <Button
                className='w-100 rounded-0'
                variant='success'
                onClick={(e) => handleChatWatchlist(movie)}
              >
                Add to chat watchlist
              </Button>
              <Button
                className='w-100 rounded-0'
                variant='success'
                onClick={(e) => handleShareWithChat(movie)}
              >
                Share with chat
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
});

Movies.propTypes = {};

export default connect(mapStateToProps, { setMovie })(Movies);
