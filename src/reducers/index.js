import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signinReducer from './signin';
import topicsReducer from './topics';
import topicReducer from './topic';
import instructorReducer from './instructor';
import bookReducer from './book';
import lectureReducer from './lecture';
import courseReducer from './course';
import lecturesReducer from './lectures';

export default history =>
  combineReducers({
    signin: signinReducer,
    topics: topicsReducer,
    topic: topicReducer,
    instructor: instructorReducer,
    book: bookReducer,
    lecture: lectureReducer,
    lectures: lecturesReducer,
    course: courseReducer,
    router: connectRouter(history)
  });
