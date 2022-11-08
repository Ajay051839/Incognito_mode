import { SET_MOVIE, SET_MOVIES } from './types';

export const setMovies = (data) => (dispatch) => {
  dispatch({
    type: SET_MOVIES,
    payload: data,
  });
};

export const setMovie = (data) => (dispatch) => {
  dispatch({
    type: SET_MOVIE,
    payload: data,
  });
};
