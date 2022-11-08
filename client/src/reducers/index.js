import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import group from './group';
import movie from './movie';
export default combineReducers({
  alert,
  auth,
  group,
  movie
});
