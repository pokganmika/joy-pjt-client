export const GET_TOPICS = 'topics/GET_TOPICS';

export const get_topics = topics => {
  return { type: GET_TOPICS, payload: { topics: topics } };
};
