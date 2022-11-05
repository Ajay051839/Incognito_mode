import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './bootstrap.min.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Grp from './components/layout/Grp';
import AddMember from './components/layout/AddMember';
import Dashboard from './components/dashboard/Dashboard';
import Invite from './components/layout/Invite';

// redux
import { connect, Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Group from './components/layout/Group';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ user }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/group' element={<Group />} />
                <Route exact path='/group/:name' element={<Grp />} />
                <Route exact path='/group/:name/add' element={<AddMember />} />
                <Route
                  exact
                  path={`/invite/${user?.name}`}
                  element={<Invite />}
                />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(App);
