import { fetchPlaylist } from "../api/playlistApi.js";
import { renderPlaylist } from "./renderPlaylist.js";

export default async function initPlaylist() {
  try {
    const resPlaylist = await fetchPlaylist();
    renderPlaylist(resPlaylist?.playlists || []);
  } catch (error) {
    console.error("Error init Playlists:", error);
  }
}
