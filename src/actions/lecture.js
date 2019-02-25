export const LECTURE_SET_ALL = 'lecture/LECTURE_SET_ALL';
export const LECTURE_ADD_COMMENTS = 'lecture/LECTURE_ADD_COMMENTS';
export const LECTURE_ADD_REVIEWS = 'lecture/LECTURE_ADD_REVIEWS';

export const set_all = lecture => {
  return {
    type: LECTURE_SET_ALL,
    payload: {
      lecture: lecture.lecture,
      instructor: lecture.instructor,
      comments: lecture.comments,
      reviews: lecture.reviews
    }
  };
};

export const add_comments = comments => {
  return {
    type: LECTURE_ADD_COMMENTS,
    payload: { comments: comments }
  };
};

export const add_reviews = reviews => {
  return { type: LECTURE_ADD_REVIEWS, payload: { reviews: reviews } };
};
