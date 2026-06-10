import httpRequest from "../utils/httpRequest.js";

export function fetchHits(limit = 20, offset = 0) {
  return httpRequest.get(`tracks?limit=${limit}&offset=${offset}`);
}

export function fetchHitById(hitId) {
  return httpRequest.get(`tracks/${hitId}`);
}

export function playTrackApi(trackId) {
  return httpRequest.post(`tracks/${trackId}/play`);
}
