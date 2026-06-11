import { fetchPlaylist } from "../api/playlistApi.js";
import initPlaylistEvents from "./event.js";
import { renderPlaylist } from "./renderPlaylist.js";

let currentPlaylists = [];

export default async function initPlaylist() {
  try {
    const resPlaylist = await fetchPlaylist();
    currentPlaylists = resPlaylist?.playlists || [];
    renderPlaylist(currentPlaylists);
  } catch (error) {
    console.error("Error init Playlists:", error);
  }
  initPlaylistEvents(currentPlaylists, renderPlaylist);
}
