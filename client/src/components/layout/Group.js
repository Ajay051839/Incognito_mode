import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import store from '../../store';
import { useNavigate } from 'react-router-dom';

const Group = ({ setAlert }) => {
  const navigate = useNavigate();
  const [grps, setGrps] = useState([]);
  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/group');
        // console.log(res.data);
        setGrps(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, [grps]);

  const handleCreateGroup = async () => {
    const name = document.getElementById('name').value;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name });
    try {
      const res = await axios.post('/api/group', body, config);
      console.log('Group Created');
      store.dispatch(setAlert('Group created', 'success'));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenGroup = (grp) => {
    navigate(`/group/${grp.name}`);
  };

  return (
    <div>
      <h3>Make a group</h3>
      <input type='text' name='name' id='name' />
      <button className='btn btn-danger' onClick={handleCreateGroup}>
        Create
      </button>
      {grps.map((grp) => (
        <div>
          <h4>{grp.name}</h4>
          <button
            className='btn btn-primary'
            onClick={() => {
              handleOpenGroup(grp);
            }}
          >
            Open
          </button>
          <br />
        </div>
      ))}
    </div>
  );
};

const mapDispatchToEvents = (dispatch) => {
  return {
    setAlert: (msg, alertType) => {
      dispatch(setAlert(msg, alertType));
    },
  };
};

Group.propTypes = {};

export default connect(mapDispatchToEvents, {})(Group);
