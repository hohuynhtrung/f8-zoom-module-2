import httpRequest from "../utils/httpRequest.js";

export function fetchAlbums(limit = 20, offset = 0) {
  return httpRequest.get(`albums?limit=${limit}&offset=${offset}`);
}

export function fetchHitById(id) {
  return httpRequest.get(`albums/${id}`);
}

export function fetchHitPopularTracks(hitId) {
  return httpRequest.get(`albums/${hitId}/tracks`);
}
