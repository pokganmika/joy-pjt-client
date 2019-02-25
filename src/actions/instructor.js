export const INSTRUCTOR_SET_ALL = 'instructor/INSTRUCTOR_SET_ALL';
export const INSTRUCTOR_ADD_COMMENTS = 'instructor/INSTRUCTOR_ADD_COMMENTS';
export const INSTRUCTOR_ADD_REVIEWS = 'instructor/INSTRUCTOR_ADD_REVIEWS';

export const INSTRUCTOR_UPDATE_INSTRUCTOR =
  'instructor/INSTRUCTOR_UPDATE_INSTRUCTOR';
export const INSTRUCTOR_UPDATE_LECTURES =
  'instructor/INSTRUCTOR_UPDATE_LECTURES';
export const INSTRUCTOR_UPDATE_BOOKS = 'instructor/INSTRUCTOR_UPDATE_BOOKS';

export const set_all = instructor => {
  return {
    type: INSTRUCTOR_SET_ALL,
    payload: {
      instructor: instructor.instructor,
      lectures: instructor.lectures,
      books: instructor.books,
      comments: instructor.comments,
      reviews: instructor.reviews
    }
  };
};

export const add_comments = comments => {
  return {
    type: INSTRUCTOR_ADD_COMMENTS,
    payload: { comments: comments }
  };
};

export const add_reviews = reviews => {
  return { type: INSTRUCTOR_ADD_REVIEWS, payload: { reviews: reviews } };
};

export const update_instructor = instructor => {
  return {
    type: INSTRUCTOR_UPDATE_INSTRUCTOR,
    payload: {
      instructor: instructor.instructor
    }
  };
};

export const update_lectures = lectures => {
  return {
    type: INSTRUCTOR_UPDATE_LECTURES,
    payload: { lectures: lectures }
  };
};

export const update_books = books => {
  return {
    type: INSTRUCTOR_UPDATE_BOOKS,
    payload: { books: books }
  };
};
