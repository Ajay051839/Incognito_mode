import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMovie } from '../../actions/movie';

const SharedMovies = ({ setMovie }) => {
  const [shared, setShared] = useState([]);
  const [mine, setMine] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get(`/api/watchlist/chat/share/${id}`);
        setShared(res.data.shared);
        setMine(res.data.mine);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  const navigate = useNavigate();
  const handleClick = (movie) => {
    setMovie(movie);
    navigate('/movieDetails');
  };

  return (
    <div>
      <h4>Shared</h4>
      <Row>
        {shared?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className='p-0 overflow-hidden h-100 shadow'>
              <div className='overflow-hidden rounded p-0 bg-dark'>
                <Card.Img
                  onClick={(e) => handleClick(movie)}
                  variant='top'
                  src={`https://image.tmdb.org/t/p/original${movie.image}`}
                />
              </div>
              <Card.Body className='text-center'>
                {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                <Card.Title className='text-black'>{movie.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h4>Mine</h4>
      <Row>
        {mine?.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className='p-0 overflow-hidden h-100 shadow'>
              <div className='overflow-hidden rounded p-0 bg-dark'>
                <Card.Img
                  onClick={(e) => handleClick(movie)}
                  variant='top'
                  src={`https://image.tmdb.org/t/p/original${movie.image}`}
                />
              </div>
              <Card.Body className='text-center'>
                {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                <Card.Title className='text-black'>{movie.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

SharedMovies.propTypes = {};

export default connect(null, { setMovie })(SharedMovies);
