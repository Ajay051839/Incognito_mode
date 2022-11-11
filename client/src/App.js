import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import Search from './components/layout/Search';
import MovieDetails from './components/layout/MovieDetails';
import Watchlist from './components/layout/Watchlist';
import MyGroups from './components/layout/MyGroups';
import GroupWatchlist from './components/layout/GroupWatchlist';
import Chat from './components/layout/Chat';
import MyChats from './components/layout/MyChats';
import ChatWatchlist from './components/layout/ChatWatchlist';
import SharedMovies from './components/layout/SharedMovies';

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
                path='/group/:name/watchlist'
                element={<GroupWatchlist />}
              />
              <Route exact path='/search' element={<Search />} />
              <Route exact path='/movieDetails' element={<MovieDetails />} />
              <Route exact path='/watchlist' element={<Watchlist />} />
              <Route exact path='/myGroups' element={<MyGroups />} />
              <Route exact path='/chat' element={<Chat />} />
              <Route exact path='/chats' element={<MyChats />} />
              <Route
                exact
                path={`/invite/${user?.name}`}
                element={<Invite />}
              />
              <Route exact path='/chats/:id' element={<ChatWatchlist />} />
              <Route exact path='/chats/share/:id' element={<SharedMovies />} />
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
