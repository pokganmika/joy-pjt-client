export const TOPIC_SET_ALL = 'topics/TOPIC_SET_ALL';
export const TOPIC_ADD_INSTRUCTOR = 'topics/TOPIC_ADD_INSTRUCTOR';
export const TOPIC_ADD_LECTURE = 'topics/TOPIC_ADD_LECTURE';
export const TOPIC_ADD_BOOK = 'topics/TOPIC_ADD_BOOK';
export const TOPIC_ADD_COURSE = 'topics/TOPIC_ADD_COURSE';

export const set_all = topic => {
  return {
    type: TOPIC_SET_ALL,
    payload: {
      topic: topic.topic,
      instructors: topic.instructors,
      lectures: topic.lectures,
      books: topic.books,
      courses: topic.courses
    }
  };
};

export const add_instructor = instructor => {
  return { type: TOPIC_ADD_INSTRUCTOR, payload: { instructors: instructor } };
};

export const add_lecture = lecture => {
  return { type: TOPIC_ADD_LECTURE, payload: { lectures: lecture } };
};

export const add_book = book => {
  return { type: TOPIC_ADD_BOOK, payload: { books: book } };
};

export const add_course = course => {
  return { type: TOPIC_ADD_COURSE, payload: { courses: course } };
};
