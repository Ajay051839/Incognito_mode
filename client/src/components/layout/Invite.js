import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../store';
import { setAlert } from '../../actions/alert';


const Invite = ({ user }) => {
  const [invites, setInvites] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    console.log(user.name);
    async function call() {
      try {
        const invite = await axios.get(`/api/group/invite/${user.name}`);
        console.log(invite);
        setInvites(invite.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  const handleAcceptInvite = async (invite) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {name} = invite
    const body = JSON.stringify({ name });
    try {
      const res = await axios.put('/api/group', body, config);
      console.log('Added to group');
      store.dispatch(setAlert('Added to group', 'success'));
        await axios.delete(`/api/group/invite/${invite._id}`);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {invites.map((invite) => (
        <div>
          {invite.name}
          <button className='btn btn-primary' onClick={(e) => handleAcceptInvite(invite)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

Invite.propTypes = {};

export default connect(mapStateToProps, {})(Invite);
