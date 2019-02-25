import { handleActions } from 'redux-actions';
import {
  TOPIC_SET_ALL,
  TOPIC_ADD_INSTRUCTOR,
  TOPIC_ADD_LECTURE,
  TOPIC_ADD_BOOK
} from '../actions/topic';

const initialState = {
  topic: '',
  instructors: [],
  lectures: [],
  books: [],
  courses: []
};

export default handleActions(
  {
    [TOPIC_SET_ALL]: (state, action) => {
      return {
        ...state,
        topic: action.payload.topic,
        instructors: action.payload.instructors,
        lectures: action.payload.lectures,
        books: action.payload.books,
        courses: action.payload.courses
      };
    },
    [TOPIC_ADD_INSTRUCTOR]: (state, action) => {
      return {
        ...state,
        instructors: state.instructors.concat(action.payload.instructors)
      };
    },
    [TOPIC_ADD_LECTURE]: (state, action) => {
      return {
        ...state,
        lectures: state.lectures.concat(action.payload.lectures)
      };
    },
    [TOPIC_ADD_BOOK]: (state, action) => {
      return { ...state, books: state.books.concat(action.payload.books) };
    }
  },
  initialState
);
