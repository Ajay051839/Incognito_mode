import { LOAD_MEMBERS } from './types';

export const loadMembers = (members) => (dispatch) => {
  dispatch({
    type: LOAD_MEMBERS,
    payload: members,
  });
};
