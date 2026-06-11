import { createPlaylistApi } from "../api/playlistApi.js";

export default function initPlaylistEvents(playlistsArray, renderPlaylistFn) {
  const createBtn = document.querySelector(".create-btn");
  const choosePhotoBtn = document.querySelector("#choose-photo-btn");
  const playlistModal = document.querySelector("#edit-playlist-modal");

  if (createBtn) {
    createBtn.addEventListener("click", async (e) => {
      try {
        const defaultPayLoad = {
          name: "My New Playlist",
          description: "Playlist description",
          is_public: true,
          image_url: "https://example.com/playlist-cover.jpg",
        };

        const res = await createPlaylistApi(defaultPayLoad);
        const newPlaylist = res?.playlist;

        if (newPlaylist) {
          const playListTitleElement =
            document.querySelector(".playlist-title");
          const playlistTypeElement = document.querySelector(".playlist-type");

          if (playListTitleElement) {
            playListTitleElement.textContent = newPlaylist.name;
          }

          if (playlistTypeElement) {
            playlistTypeElement.textContent = newPlaylist.is_public
              ? "Public Playlist"
              : "Private Playlist";
          }

          playlistsArray.unshift(newPlaylist);

          renderPlaylistFn(playlistsArray);
        }
      } catch (error) {
        console.error("Error init playlist", error);
      }
    });
  }
}
