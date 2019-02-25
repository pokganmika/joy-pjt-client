import { handleActions } from 'redux-actions';
import {
  BOOK_SET_ALL,
  BOOK_ADD_COMMENTS,
  BOOK_ADD_REVIEWS,
  BOOK_UPDATE_BOOK,
  BOOK_UPDATE_INSTRUCTOR
} from '../actions/book.js';

const initialState = {
  book: {},
  instructor: {},
  comments: [],
  reviews: []
};

export default handleActions(
  {
    [BOOK_SET_ALL]: (state, action) => {
      return {
        ...state,
        book: action.payload.book,
        instructor: action.payload.instructor,
        comments: action.payload.comments
      };
    },
    [BOOK_ADD_COMMENTS]: (state, action) => {
      return {
        ...state,
        comments: state.comments.concat(action.payload.comments)
      };
    },
    [BOOK_ADD_REVIEWS]: (state, action) => {
      return {
        ...state,
        reviews: state.reviews.concat(action.payload.reviews)
      };
    },
    [BOOK_UPDATE_BOOK]: (state, action) => {
      return {
        ...state,
        book: action.payload.book
      };
    },
    [BOOK_UPDATE_INSTRUCTOR]: (state, action) => {
      return {
        ...state,
        instructor: action.payload.instructor
      };
    }
  },
  initialState
);
