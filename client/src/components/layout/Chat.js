import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Chat = ({ movie }) => {
  const [chats, setChats] = useState([]);

  const handleAddMovieToChatWatchlist = async (chat) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const name = movie?.title
        ? movie?.title
        : movie?.original_title
        ? movie?.original_title
        : movie?.original_name;
      const image = movie?.backdrop_path;
      const body = JSON.stringify({ name, image });
      const res = await axios.put(
        `/api/watchlist/chat/${chat._id}`,
        body,
        config
      );
      console.log(res.data);
      setAlert('Movie added to watchlist', 'success');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleShareToChat = async chat => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const name = movie?.title
        ? movie?.title
        : movie?.original_title
        ? movie?.original_title
        : movie?.original_name;
      const image = movie?.backdrop_path;
      const body = JSON.stringify({ name, image });
      const res = await axios.post(
        `/api/watchlist/chat/share/${chat._id}`,
        body,
        config
      );
      console.log(res.data);
      setAlert('Movie Shared', 'success');
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/users');
        console.log(res.data);
        setChats(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div>
          <h3>{chat.name}</h3>
          <button
            className='btn btn-secondary'
            onClick={(e) => handleAddMovieToChatWatchlist(chat)}
          >
            Add
          </button>
          <button
            className='btn btn-secondary'
            onClick={(e) => handleShareToChat(chat)}
          >
            Share
          </button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movie.movieLoaded,
});

Chat.propTypes = {};

export default connect(mapStateToProps, {})(Chat);
