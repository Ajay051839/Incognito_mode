import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
// import User from '../../../../models/User';
// import {connect} from 'react-redux'

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='#!' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
        <Link to='/search'>
          <span>Search</span>
        </Link>
        <Link to='/group'>
          <span>Group</span>
        </Link>
        <Link to={`/invite/${user?.name}`}>
          <span className='hide-sm'>Invites</span>
        </Link>
        <Link to={`/watchlist`}>
          <span className='hide-sm'>Watchlist</span>
        </Link>
        <Link to={`/chats`}>
          <span className='hide-sm'>Chats</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark fixed-top'>
      <h1>
        <Link to='/dashboard'>
          <i className='fas fa-code'></i> Movie Hunt
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
