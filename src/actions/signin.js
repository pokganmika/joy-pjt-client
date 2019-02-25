// import { createActions } from 'redux-actions';

export const SIGNIN = 'sign/SIGNIN';
export const SIGNOUT = 'sign/SIGNOUT';

// export const signin = createActions(SIGNIN);
// export const signout = createActions(SIGNOUT);

export const signin = user => {
  return {
    type: SIGNIN,
    payload: {
      user: user
    }
  };
};

export const signout = name => {
  return {
    type: SIGNOUT,
    payload: {
      user: ''
    }
  };
};
