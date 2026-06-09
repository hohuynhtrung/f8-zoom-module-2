import { fetchArtists } from "../api/artistApi.js";
import { renderArtists } from "./renderArtists.js";
import initArtistEvents from "./events.js";

export default async function initArtists() {
  initArtistEvents();

  try {
    const res = await fetchArtists();
    renderArtists(res.artists);
  } catch (error) {
    console.log(error);
  }
}
