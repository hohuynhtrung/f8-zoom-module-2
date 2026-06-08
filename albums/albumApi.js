import httpRequest from "../utils/httpRequest.js";
import { renderHitAlbums } from "./renderHitAlbum.js";

export async function hitAlbums() {
  try {
    const res = await httpRequest.get("albums?limit=20&offset=0");
    renderHitAlbums(res.albums);
  } catch (error) {
    console.log(error);
  }
}
