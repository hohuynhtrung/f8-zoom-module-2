import { fetchArtists } from "../api/artistApi.js";
import { fetchFollowingArtists } from "../api/authApi.js";
import { renderArtists } from "./renderArtists.js";
import { renderFollowingArtists } from "./renderFollowingArtists.js";
import initArtistEvents from "./events.js";

let libraryArtistsArray = [];

export async function loadFollowingList() {
  try {
    const resFollowing = await fetchFollowingArtists();
    const artists = resFollowing?.artists || [];

    libraryArtistsArray.length = 0;
    libraryArtistsArray.push(...artists);

    renderFollowingArtists(libraryArtistsArray);
  } catch (error) {
    console.log("Error loading following list:", error);
  }
}

export default async function initArtists() {
  initArtistEvents(libraryArtistsArray, renderFollowingArtists);

  try {
    const resArtist = await fetchArtists();
    renderArtists(resArtist?.artists || []);

    // Gọi hàm load following lần đầu tiên khi mở trang
    await loadFollowingList();
  } catch (error) {
    console.error(error);
  }
}
