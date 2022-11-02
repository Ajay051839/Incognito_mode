import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';

const Dashboard = (props) => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentlyReleased, setRecentlyReleased] = useState([]);
  const [genre, setGenre] = useState(0);
  const [genreMovies, setGenreMovies] = useState([]);

  const handleChange = (e) => {
    setGenre(e);
  };

  useEffect(() => {
    async function call() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=b219d5633bef962f549e1aa30a853381&with_genres=${genre}`
        );
        const data = await res.json();
        console.log(data);
        setGenreMovies(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, [genre]);

  useEffect(() => {
    async function call() {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=b219d5633bef962f549e1aa30a853381'
        );
        const data = await res.json();
        console.log(data);
        setTrending(data);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const res = await fetch();
      } catch (err) {
        console.log(err.message);
      }
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=b219d5633bef962f549e1aa30a853381&language=en-US'
        );
        const data = await res.json();
        console.log(data);
        setTopRated(data);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=b219d5633bef962f549e1aa30a853381&language=en-US&page=1&region=IN'
        );
        const data = await res.json();
        console.log(data);
        setRecentlyReleased(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    call();
  }, []);
  return (
    <div>
      <h3>Trending Movies</h3>
      <Row>
        {trending?.results?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={movie.id}
            >
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ height: '15vw', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3>Top Rated Movies</h3>
      <Row>
        {topRated?.results?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={movie.id}
            >
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ height: '15vw', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Recently Released Movies</h3>
      <Row>
        {recentlyReleased?.results?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={movie.id}
            >
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ height: '15vw', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Explore Different Genre</h3>
      <select
        class='form-select'
        aria-label='Default select example'
        onChange={(e) => handleChange(e.target.value)}
      >
        <option selected>Select genre</option>
        <option value='28'>Action</option>
        <option value='35'>Comedy</option>
        <option value='27'>Horror</option>
        <option value='10749'>Romance</option>
        <option value='27'>Horror</option>
        <option value='16'>Animation</option>
        <option value='18'>Drama</option>
      </select>

      <Row>
        {genreMovies?.results?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={movie.id}
            >
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ height: '15vw', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  <strong>{movie.title}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
