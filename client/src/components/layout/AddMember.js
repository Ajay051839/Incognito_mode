import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import store from '../../store';
import { setAlert } from '../../actions/alert';

const AddMember = ({ members }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams();
  const [mem, setMem] = useState([]);
  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/users/');
        setUsers(res);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  useEffect(() => {
    // var array = new Array();
    console.log(users.data);
    console.log(members);
    let array = users.data?.filter((x) => !members.includes(x));
    console.log(array);
    setMem(array);
  }, [users]);

  const handleInvite = async (s) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, s });
    try {
      const res = await axios.post(`/api/group/${name}/${s}`, body, config);
      console.log('User invited');
      store.dispatch(setAlert('User invited', 'success'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {mem?.map((m) => (
        <div>
          <h2>{m.name}</h2>
          <h4>{m.email}</h4>
          <button
            className='btn btn-secondary'
            onClick={(e) => handleInvite(m.name)}
          >
            Invite
          </button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.group.members,
});

AddMember.propTypes = {};

export default connect(mapStateToProps, {})(AddMember);
