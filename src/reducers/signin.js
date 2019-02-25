import { handleActions } from 'redux-actions';
import { SIGNIN, SIGNOUT } from '../actions/signin';

const initialState = {
  isSignin: false,
  user: ''
};

export default handleActions(
  {
    [SIGNIN]: (state, action) => {
      return {
        ...state,
        isSignin: true,
        user: action.payload.user
      };
    },
    [SIGNOUT]: (state, action) => {
      return { ...state, isSignin: false };
    }
  },
  initialState
);
