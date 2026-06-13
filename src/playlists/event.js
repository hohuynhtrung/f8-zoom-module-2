import { createPlaylistApi, getPlaylistById } from "../api/playlistApi.js";
import { showPlayContent } from "../ui/veiws.js";

export default function initPlaylistEvents(playlistsArray, renderPlaylistFn) {
  const createBtn = document.querySelector(".create-btn");
  const libraryPlaylist = document.querySelector(".library-playlist");
  const choosePhotoBtn = document.querySelector("#choose-photo-btn");
  const playlistModal = document.querySelector("#edit-playlist-modal");
  const playListTitleElement = document.querySelector(".playlist-title");
  const playlistTypeElement = document.querySelector(".playlist-type");
  const playlistOwnerElement = document.querySelector(".playlist-owner");
  const playlistModalName = document.querySelector("#playlist-modal-name");

  if (createBtn) {
    createBtn.addEventListener("click", async (e) => {
      showPlayContent();
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
          if (playListTitleElement) {
            playListTitleElement.textContent = newPlaylist.name;
            playlistModalName.value = newPlaylist.name;
          }

          if (playlistTypeElement) {
            playlistTypeElement.textContent = newPlaylist.is_public
              ? "Public Playlist"
              : "Private Playlist";
          }
          if (playlistOwnerElement) {
            playlistOwnerElement.textContent = newPlaylist.user_name;
          }
          playlistsArray.unshift(newPlaylist);

          renderPlaylistFn(playlistsArray);
        }
      } catch (error) {
        console.error("Error init playlist", error);
      }
    });
  }

  if (libraryPlaylist) {
    libraryPlaylist.addEventListener("click", async (e) => {
      const item = e.target.closest(".library-item");
      if (!item) return;

      const playlistId = item.dataset.id;
      if (!playlistId) {
        console.log("không tìm thấy data");

        return;
      }

      showPlayContent();

      try {
        const res = await getPlaylistById(playlistId);

        if (res) {
          if (playListTitleElement) {
            playListTitleElement.textContent = res.name;
            playlistModalName.value = res.name;
          }
          if (playlistTypeElement) {
            playlistTypeElement.textContent = res.is_public
              ? "Public Playlist"
              : "Private Playlist";
          }
          if (playlistOwnerElement) {
            playlistOwnerElement.textContent = res.user_username || "Unknow";
          }

          if (choosePhotoBtn) {
            const imgTag = choosePhotoBtn.querySelector("img");
            if (imgTag) {
              imgTag.src = res.image_url || "./placeholder.svg";
            } else if (res.image_url) {
              choosePhotoBtn.style.backgroundImage = `url('${res.image_url}')`;
              choosePhotoBtn.style.backgroundSize = "cover";
            }
          }
        }
      } catch (error) {
        console.error("Error get playlist detail", error);
      }
    });
  }
}
