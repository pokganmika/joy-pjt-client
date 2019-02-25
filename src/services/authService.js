import jwtDecode from 'jwt-decode';
import http, { SERVER_URL } from './httpService';

import { KEY_TOPICS } from './topicService';
export const KEY_TOKEN = 'token';
export const KEY_USER = 'user';

http.setJwt(getJwt());

export async function login(email, password) {
  // MySQL
  const apiEndpoint = SERVER_URL + '/auth/login';
  // MongoDB
  // const apiEndpoint = SERVER_URL + '/api/auth';

  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  console.log('[+] /auth/login : token = ', jwt);
  // localStorage.setItem(KEY_TOKEN, jwt);
  saveJwt(jwt);
}

export function loginWithJwt(jwt) {
  // localStorage.setItem(KEY_TOKEN, jwt);
  saveJwt(jwt);
}

export async function loginSocial(site) {
  const { data: jwt } = await http.get(`${SERVER_URL}/auth/${site}`);
  // localStorage.setItem(KEY_TOKEN, jwt);
  saveJwt(jwt);
}

export function logout() {
  localStorage.removeItem(KEY_TOKEN);
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_TOPICS);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(KEY_TOKEN);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(KEY_TOKEN);
}

async function saveJwt(jwt) {
  if (!jwt || jwt !== 'undefined' || jwt !== undefined) {
    localStorage.setItem(KEY_TOKEN, jwt);
  }
  const { name } = jwtDecode(jwt);
  const { data } = await http.get(`${SERVER_URL}/api/users/${name}`);

  console.log(JSON.stringify(data.user));
  localStorage.setItem(KEY_USER, JSON.stringify(data.user));
}

export default {
  login,
  loginWithJwt,
  loginSocial,
  // loginKakao,
  // loginGithub,
  logout,
  getCurrentUser,
  getJwt
};
