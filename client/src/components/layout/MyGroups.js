import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const MyGroups = ({ user, movie }) => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/group');
        var array = new Array();
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].users.length; j++) {
            if (res.data[i].users[j].user === user._id) {
              array.push(res.data[i]);
            }
          }
        }
        setGroups(array);
        console.log('Array', array);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  const handleAddMovieToGroupWatchlist = async (group) => {
    try{
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const name = movie.title
        ? movie.title
        : movie.original_title
        ? movie.original_title
        : movie.original_name;
      const image = movie.backdrop_path;
      const body = JSON.stringify({name, image});
        const res = await axios.put(`/api/watchlist/group/${group._id}`, body, config)
        console.log(res.data);
        setAlert('Movie added to watchlist', 'success');
    } catch(err){
        console.log(err.message);
    }
  }

  return (
    <div>
      {groups.map((group) => (
        <div>
          <h3>{group.name}</h3>
          <button className='btn btn-secondary' onClick={(e) => (handleAddMovieToGroupWatchlist(group))}>Add</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  movie: state.movie.movieLoaded
});

MyGroups.propTypes = {};

export default connect(mapStateToProps, {})(MyGroups);
