const KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

export function setAccessToken(token) {
  localStorage.setItem(KEYS.ACCESS_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(KEYS.ACCESS_TOKEN);
}

export function setRefreshToken(token) {
  localStorage.setItem(KEYS.REFRESH_TOKEN, token);
}

export function getRefreshToken() {
  return localStorage.getItem(KEYS.REFRESH_TOKEN);
}

export function setUser(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.clear();
}

/** Lưu phiên đăng nhập sau khi register/login thành công */
export function saveSession({ access_token, refresh_token, user }) {
  setAccessToken(access_token);
  setRefreshToken(refresh_token);
  setUser(user);
}

/** Xóa toàn bộ phiên đăng nhập */
export function clearSession() {
  clearAuth();
}
