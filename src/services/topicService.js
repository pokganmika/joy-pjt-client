import http, { SERVER_URL } from './httpService';

export const KEY_TOPICS = 'topics';

export async function getTopics() {
  let topics = JSON.parse(localStorage.getItem(KEY_TOPICS));

  if (!topics) {
    const { data } = await http.get(SERVER_URL + '/topics');
    topics = data;

    localStorage.setItem(KEY_TOPICS, JSON.stringify(topics));
  }

  console.log('[+] [getTopics] topics = ', topics);
  return topics;
}

export async function getTopic(props) {
  const { topic } = props.topic.match.params;
  console.log('[+] ///////// topic @ topicService = ', topic);

  return topic;
}
