import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
//import React, { ReactElement, useEffect } from "react"//;
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';



// const navigate = useNavigate();
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    console.log(isAuthenticated);
  };

  


  

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
      <div className='cover'>
        <div className='text-10xl font-bold ml-5'>
        <h1>Login</h1></div>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
            onChange={(e) => onChange(e)} />
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            required
            onChange={(e) => onChange(e)} className="my-2" />

          {/* <div classNameName="login-btn" onClick={popup}>Login</div> */}
          <input type='submit' className='login-btn' value='Login' />
        </form>


        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>

      </div>
  
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
