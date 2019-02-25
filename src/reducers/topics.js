import { handleActions } from 'redux-actions';
import { GET_TOPICS } from '../actions/topics';

const initialState = {
  topics: []
};

export default handleActions(
  {
    [GET_TOPICS]: (state, action) => {
      return {
        ...state,
        topics: action.payload.topics
      };
    }
  },
  initialState
);
