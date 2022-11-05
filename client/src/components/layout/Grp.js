import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadMembers } from '../../actions/group';
import { useNavigate } from 'react-router-dom';

const Grp = ({ members, loadMembers }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const handleAddMembers = () => {
    navigate(`/group/${name}/add`);
  };

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get(`/api/group/${name}`);
        console.log(res.data);
        var array = new Array();
        for (var i = 0; i < res.data[0].users.length; i++) {
          try {
            console.log(res.data[0].users[i]);
            const user = await axios.get(`/api/users/${res.data[0].users[i].user}`);
            array.push(user.data);
          } catch (err) {
            console.log(err.message);
          }
        }
        console.log(array);
        loadMembers(array);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);
  return (
    <div>
      <h3>Members</h3>
      {members.map((member) => (
        <h4>{member.name}</h4>
      ))}
      <button className='btn btn-primary' onClick={handleAddMembers}>
        Add member
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.group.members,
});

Grp.propTypes = {};

export default connect(mapStateToProps, { loadMembers })(Grp);
