import httpRequest from "../utils/httpRequest.js";

export function fetchAlbums(limit = 20, offset = 0) {
  return httpRequest.get(`albums?limit=${limit}&offset=${offset}`);
}
