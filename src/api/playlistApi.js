import httpRequest from "../utils/httpRequest.js";

export function fetchPlaylist(limit = 20, offset = 0) {
  return httpRequest.get(`me/playlists`);
}

export function createPlaylistApi(data) {
  return httpRequest.post(`playlists`, data);
}

export function getPlaylistById(playlistId) {
  return httpRequest.get(`playlists/${playlistId}`);
}

export function deletePlaylistById(playlistId) {
  return httpRequest.del(`playlists/${playlistId}`);
}
