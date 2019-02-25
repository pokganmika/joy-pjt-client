import http, { SERVER_URL } from './httpService';

// MySQL
const apiEndpoint = SERVER_URL + '/auth/join';
// MongoDB
// const apiEndpoint = SERVER_URL + "/api/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
