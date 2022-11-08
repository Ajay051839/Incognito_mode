import { SET_MOVIES, SET_MOVIE } from "../actions/types";

const initialState = {
    movies: [],
    movieLoaded: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch (type) {
      case SET_MOVIES:
        return {
          ...state,
          movies: payload,
        };
      case SET_MOVIE:
        return {
          ...state,
          movieLoaded: payload,
        };
      default:
        return state;
    }
}