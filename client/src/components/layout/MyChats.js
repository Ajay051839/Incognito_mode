import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyChats = props => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        async function call(){
            try{
                const res = await axios.get('/api/users');
                console.log(res.data);
                setChats(res.data);
            } catch(err){
                console.log(err.message);
            }
        } call();
    },[])

    const handleGetWatchlist = (chat) => {
        navigate(`/chats/${chat._id}`);
    }

    const handleGetSharedMovies = chat => {
        navigate(`/chats/share/${chat._id}`);
    }

  return (
    <div>
      {chats.map((chat) => (
        <>
          <h3>{chat.name}</h3>
          <button
            className='btn btn-primary'
            onClick={(e) => handleGetWatchlist(chat)}
          >
            Watchlist
          </button>
          <button
            className='btn btn-primary'
            onClick={(e) => handleGetSharedMovies(chat)}
          >
            Shared Movies
          </button>
        </>
      ))}
    </div>
  );
}

MyChats.propTypes = {}

export default MyChats