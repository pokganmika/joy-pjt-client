import { handleActions } from 'redux-actions';
import {
  LECTURE_SET_ALL,
  LECTURE_ADD_COMMENTS,
  LECTURE_ADD_REVIEWS
} from '../actions/lecture.js';

const initialState = {
  lecture: {},
  instructor: {},
  comments: [],
  reviews: []
};

export default handleActions(
  {
    [LECTURE_SET_ALL]: (state, action) => {
      return {
        ...state,
        lecture: action.payload.lecture,
        instructor: action.payload.instructor,
        comments: action.payload.comments,
        reviews: action.payload.reviews
      };
    },
    [LECTURE_ADD_COMMENTS]: (state, action) => {
      return {
        ...state,
        comments: state.comments.concat(action.payload.comments)
      };
    },
    [LECTURE_ADD_REVIEWS]: (state, action) => {
      return {
        ...state,
        reviews: state.reviews.concat(action.payload.reviews)
      }; // reviews: action.payload.reviews
    }
  },
  initialState
);
