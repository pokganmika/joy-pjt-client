export const COURSE_SET_TOPIC = 'course/COURSE_SET_TOPIC';
export const COURSE_SET_NAME = 'course/COURSE_SET_NAME';
export const COURSE_SET_LECTURE = 'course/COURSE_SET_LECTURE';
export const COURSE_SET_BOOK = 'course/COURSE_SET_BOOK';
export const COURSE_SET_COMMENT = 'course/COURSE_SET_COMMENT';
export const COURSE_SET_REVIEW = 'course/COURSE_SET_REVIEW';
export const COURSE_ADD_COURSE = 'course/COURSE_ADD_COURSE';
export const COURSE_ADD_COMMENTS = 'course/COURSE_ADD_COMMENTS';
export const COURSE_ADD_REVIEWS = 'course/COURSE_ADD_REVIEWS';

export const set_name = name => {
  return { type: COURSE_SET_NAME, payload: { name: name } };
};

export const set_topic = course => {
  return {
    type: COURSE_SET_TOPIC,
    payload: {
      topic: course.topic,
      data: { lectures: course.data.lectures, books: course.data.books }
    }
  };
};

export const set_lecture = lecture => {
  return {
    type: COURSE_SET_LECTURE,
    payload: {
      lecture: lecture
    }
  };
};

export const set_book = book => {
  return { type: COURSE_SET_BOOK, payload: { book: book } };
};

export const set_comment = comment => {
  return { type: COURSE_SET_COMMENT, payload: { comment: comment } };
};

export const add_course = course => {
  return { type: COURSE_ADD_COURSE, payload: { course: course } };
};

export const set_review = review => {
  return { type: COURSE_SET_REVIEW, payload: { review: review } };
};

export const add_comments = comment => {
  return { type: COURSE_ADD_COMMENTS, payload: { comment: comment } };
};

export const add_reviews = review => {
  return { type: COURSE_ADD_REVIEWS, payload: { review: review } };
};
