import httpRequest from "../utils/httpRequest.js";

export function registerApi({ username, email, password }) {
  return httpRequest.post("auth/register", { username, email, password });
}

export function loginApi({ email, password }) {
  return httpRequest.post("auth/login", { email, password });
}

export function logoutApi(refreshToken) {
  return httpRequest.post("auth/logout", { refresh_token: refreshToken });
}

export function fetchFollowingArtists(limit = 20, offset = 0) {
  return httpRequest.get(`me/following?limit=${limit}&offset=${offset}`);
}
