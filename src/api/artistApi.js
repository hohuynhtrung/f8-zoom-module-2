import httpRequest from "../utils/httpRequest.js";

export function fetchArtists(limit = 20, offset = 0) {
  return httpRequest.get(`artists?limit=${limit}&offset=${offset}`);
}

export function fetchArtistById(artistId) {
  return httpRequest.get(`artists/${artistId}`);
}

export function fetchArtistPopularTracks(artistId) {
  return httpRequest.get(`artists/${artistId}/tracks/popular`);
}
