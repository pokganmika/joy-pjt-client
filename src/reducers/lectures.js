import { handleActions } from 'redux-actions';
import { GET_LECTURES } from '../actions/lectures';

const initialState = {
  lectures: []
};

export default handleActions(
  {
    [GET_LECTURES]: (state, action) => {
      return { ...state, lectures: action.payload.lectures };
    }
  },
  initialState
);
