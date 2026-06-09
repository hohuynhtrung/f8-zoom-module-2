import { fetchAlbums } from "../api/albumApi.js";
import { renderHitAlbums } from "./renderHits.js";
import initAlbumEvents from "./events.js";

export default async function initAlbums() {
  initAlbumEvents();

  try {
    const res = await fetchAlbums();
    renderHitAlbums(res.albums);
  } catch (error) {
    console.log(error);
  }
}
