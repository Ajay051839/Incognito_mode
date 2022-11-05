import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

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

  function truncate(str) {
    return str.length > 15 ? str.substring(0, 14) + "..." : str;
}
  return (
    <div className='px-0 py-0'>
      <h3>Trending Movies</h3>
      <div className='my-4'>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {trending?.results?.map((movie) => (
            <SwiperSlide>
              {/* <ProductCard
                data={{ imgSrc: img1, price: '$10', title: 'Juicy Grapes' }}
              /> */}
              <Card className='p-0 overflow-hidden h-100 shadow'>
                <div className='overflow-hidden rounded p-0 bg-dark'>
                  <Card.Img
                    variant='top'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
                <Card.Body className='text-center'>
                  {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                  <Card.Title className='text-black'>
                    {truncate(movie.title)}
                  </Card.Title>
                </Card.Body>
                {/* <Button className='w-100 rounded-0' variant='success'></Button> */}
              </Card>
              {/* <h4 className='text-black py-3'>{truncate(movie.title)}</h4> */}
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        <h3>Top Rated Movies</h3>
      <div className='my-4'>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {topRated?.results?.map((movie) => (
            <SwiperSlide>
              {/* <ProductCard
                data={{ imgSrc: img1, price: '$10', title: 'Juicy Grapes' }}
              /> */}
              <Card className='p-0 overflow-hidden h-100 shadow'>
                <div className='overflow-hidden rounded p-0 bg-dark'>
                  <Card.Img
                    variant='top'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
                <Card.Body className='text-center'>
                  {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                  <Card.Title className='text-black'>
                    {truncate(movie.title)}
                  </Card.Title>
                </Card.Body>
                {/* <Button className='w-100 rounded-0' variant='success'></Button> */}
              </Card>
              {/* <h4 className='text-black py-3'>{truncate(movie.title)}</h4> */}
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        <h3>Recently Released Movies</h3>
      <div className='my-4'>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {recentlyReleased?.results?.map((movie) => (
            <SwiperSlide>
              {/* <ProductCard
                data={{ imgSrc: img1, price: '$10', title: 'Juicy Grapes' }}
              /> */}
              <Card className='p-0 overflow-hidden h-100 shadow'>
                <div className='overflow-hidden rounded p-0 bg-dark'>
                  <Card.Img
                    variant='top'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
                <Card.Body className='text-center'>
                  {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                  <Card.Title className='text-black'>
                    {truncate(movie.title)}
                  </Card.Title>
                </Card.Body>
                {/* <Button className='w-100 rounded-0' variant='success'></Button> */}
              </Card>
              {/* <h4 className='text-black py-3'>{truncate(movie.title)}</h4> */}
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
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
        {/* <h3>Trending Movies</h3> */}
      <div className='my-4'>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {genreMovies?.results?.map((movie) => (
            <SwiperSlide>
              {/* <ProductCard
                data={{ imgSrc: img1, price: '$10', title: 'Juicy Grapes' }}
              /> */}
              <Card className='p-0 overflow-hidden h-100 shadow'>
                <div className='overflow-hidden rounded p-0 bg-dark'>
                  <Card.Img
                    variant='top'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
                <Card.Body className='text-center'>
                  {/* <Card.Title className='display-5'>{movie.title}</Card.Title> */}
                  <Card.Title className='text-black'>
                    {truncate(movie.title)}
                  </Card.Title>
                </Card.Body>
                {/* <Button className='w-100 rounded-0' variant='success'></Button> */}
              </Card>
              {/* <h4 className='text-black py-3'>{truncate(movie.title)}</h4> */}
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <Row>
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
        </Row> */}
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
