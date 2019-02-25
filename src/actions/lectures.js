export const GET_LECTURES = 'topics/GET_LECTURES';

export const get_lectures = lectures => {
  return { type: GET_LECTURES, payload: { lectures: lectures } };
};
