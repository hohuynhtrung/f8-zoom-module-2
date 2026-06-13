import {
  createPlaylistApi,
  deletePlaylistById,
  getPlaylistById,
} from "../api/playlistApi.js";
import { showConfirmDelete } from "../ui/confirmDelete.js";
import { showHomeContent, showPlayContent } from "../ui/veiws.js";

export default function initPlaylistEvents(playlistsArray, renderPlaylistFn) {
  const createBtn = document.querySelector(".create-btn");
  const libraryPlaylist = document.querySelector(".library-playlist");
  const choosePhotoBtn = document.querySelector("#choose-photo-btn");
  const playlistModal = document.querySelector("#edit-playlist-modal");
  const playListTitleElement = document.querySelector(".playlist-title");
  const playlistTypeElement = document.querySelector(".playlist-type");
  const playlistOwnerElement = document.querySelector(".playlist-owner");
  const playlistModalName = document.querySelector("#playlist-modal-name");
  const deletePlayListBtn = document.querySelector(".delete-playlist");

  let currentActivePlaylistId = null;

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
      if (!playlistId) return;
      currentActivePlaylistId = playlistId;

      const activeItem = libraryPlaylist.querySelector(".library-item.active");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      item.classList.add("active");
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

  if (deletePlayListBtn) {
    deletePlayListBtn.addEventListener("click", async (e) => {
      if (!currentActivePlaylistId) {
        alert("Please select a list of instruments that can be deleted!");
        return;
      }

      const currentPlaylistName = playListTitleElement
        ? playListTitleElement.textContent
        : "this playlist";

      showConfirmDelete({
        title: "Delete from Your Library?",
        message: `This will delete ${currentPlaylistName} from Your Library.`,

        onConfirm: async () => {
          try {
            const currentIndex = playlistsArray.findIndex(
              (p) => p.id === currentActivePlaylistId,
            );
            await deletePlaylistById(currentActivePlaylistId);
            const updatedPlaylists = playlistsArray.filter(
              (p) => p.id !== currentActivePlaylistId,
            );
            playlistsArray.length = 0;
            playlistsArray.push(...updatedPlaylists);
            renderPlaylistFn(playlistsArray);

            // Logic auto do to previous item when delete current item
            if (playlistsArray.length > 0) {
              let nextActivePlaylist = null;
              if (currentIndex > 0) {
                nextActivePlaylist = playlistsArray[currentIndex - 1];
              } else {
                nextActivePlaylist = playlistsArray[0];
              }
              if (nextActivePlaylist) {
                currentActivePlaylistId = nextActivePlaylist.id;

                setTimeout(() => {
                  const targetSidebarItem = document.querySelector(
                    `.library-item[data-id="${nextActivePlaylist.id}"]`,
                  );
                  if (targetSidebarItem) {
                    targetSidebarItem.click();
                  }
                }, 150);
              }
            } else {
              currentActivePlaylistId = null;
              showHomeContent();
            }
          } catch (error) {
            console.error("Error delete playlist", error);
          }
        },
      });
    });
  }
}
