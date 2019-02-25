import { handleActions } from 'redux-actions';
import {
  COURSE_SET_TOPIC,
  COURSE_SET_NAME,
  COURSE_SET_LECTURE,
  COURSE_SET_BOOK,
  COURSE_SET_COMMENT,
  COURSE_ADD_COURSE,
  COURSE_SET_REVIEW,
  COURSE_ADD_COMMENTS,
  COURSE_ADD_REVIEWS
} from '../actions/course.js';

const initialState = {
  topic: '',
  name: '',
  courses: [],
  lecture: '',
  book: '',
  comment: '',
  data: {
    lectures: [],
    books: []
  },
  comments: [],
  reviews: []
};

export default handleActions(
  {
    [COURSE_SET_TOPIC]: (state, action) => {
      return {
        ...state,
        topic: action.payload.topic,
        data: {
          ...state.data,
          lectures: action.payload.data.lectures,
          books: action.payload.data.books
        }
      };
    },
    [COURSE_SET_NAME]: (state, action) => {
      return { ...state, name: action.payload.name };
    },
    [COURSE_SET_LECTURE]: (state, action) => {
      return {
        ...state,
        lecture: action.payload.lecture
      };
    },
    [COURSE_SET_BOOK]: (state, action) => {
      return {
        ...state,
        book: action.payload.book
      };
    },
    [COURSE_SET_COMMENT]: (state, action) => {
      return {
        ...state,
        comment: action.payload.comment
      };
    },
    [COURSE_ADD_COURSE]: (state, action) => {
      return {
        ...state,
        courses: state.courses.concat(action.payload.course)
      };
    },
    [COURSE_SET_REVIEW]: (state, action) => {
      return { ...state, review: action.payload.review };
    },
    [COURSE_ADD_COMMENTS]: (state, action) => {
      return {
        ...state,
        comments: state.comments.concat(action.payload.comment)
      };
    },
    [COURSE_ADD_REVIEWS]: (state, action) => {
      return {
        ...state,
        reviews: state.reviews.concat(action.payload.review)
      };
    }
  },
  initialState
);
