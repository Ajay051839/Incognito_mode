import React, { Fragment, useState ,useEffect} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
//import React, { ReactElement, useEffect } from "react"//;
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { gapi } from "gapi-script";
import "./loginform.css";


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

  useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
            scope: ""
        })
    }
    gapi.load('client: auth2', start)
})

const [popupStyle, showPopup] = useState("hide")

const popup = () => {
    showPopup("login-popup")
    setTimeout(() => showPopup("hide"), 3000)
}

const onSuccess = e => {
    alert("User signed in")
    console.log(e)
}

const onFailure = e => {
  alert("User sign in Failed")
  console.log(e)
}

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (

        <div className='page'>
         <div className='cover'>
          <h1>Login</h1>
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
            onChange={(e) => onChange(e)} className="my-2"/>

<div className="login-btn" onClick={popup}>Login</div>

    <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
            
         </div>
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
