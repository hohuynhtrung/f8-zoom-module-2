import httpRequest from "../utils/httpRequest.js";
import { renderHitAlbums } from "./renderHit.js";
import { renderPopularArt } from "./renderPopularArt.js";

// Today's biggest hits
export async function biggestHits() {
  try {
    const res = await httpRequest.get("albums?limit=20&offset=0");
    renderHitAlbums(res.albums);
  } catch (error) {
    console.log(error);
  }
}

//Popular artists
export async function popularArtists() {
  try {
    const res = await httpRequest.get("artists?limit=20&offset=0");
    renderPopularArt(res.artists);
  } catch (error) {
    console.log(error);
  }
}
