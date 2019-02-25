import { handleActions } from 'redux-actions';
import {
  INSTRUCTOR_SET_ALL,
  INSTRUCTOR_ADD_COMMENTS,
  INSTRUCTOR_ADD_REVIEWS,
  INSTRUCTOR_UPDATE_INSTRUCTOR,
  INSTRUCTOR_UPDATE_LECTURES,
  INSTRUCTOR_UPDATE_BOOKS
} from '../actions/instructor.js';

const initialState = {
  instructor: {},
  lectures: {},
  books: {},
  comments: [],
  reviews: []
};

export default handleActions(
  {
    [INSTRUCTOR_SET_ALL]: (state, action) => {
      return {
        ...state,
        instructor: action.payload.instructor,
        comments: action.payload.comments,
        lectures: action.payload.lectures,
        books: action.payload.books,
        reviews: action.payload.reviews
      };
    },
    [INSTRUCTOR_ADD_COMMENTS]: (state, action) => {
      return {
        ...state,
        comments: state.comments.concat(action.payload.comments)
      };
    },
    [INSTRUCTOR_ADD_REVIEWS]: (state, action) => {
      return {
        ...state,
        reviews: state.reviews.concat(action.payload.reviews)
        // reviews: action.payload.reviews
      };
    },
    [INSTRUCTOR_UPDATE_INSTRUCTOR]: (state, action) => {
      return {
        ...state,
        instructor: action.payload.instructor
      };
    },
    [INSTRUCTOR_UPDATE_LECTURES]: (state, action) => {
      return {
        ...state,
        lectures: action.payload.lectures
      };
    },
    [INSTRUCTOR_UPDATE_BOOKS]: (state, action) => {
      return {
        ...state,
        books: action.payload.books
      };
    }
  },
  initialState
);
