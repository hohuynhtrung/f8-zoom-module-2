import {
  createPlaylistApi,
  deletePlaylistById,
  getPlaylistById,
  updatePlaylistById,
} from "../api/playlistApi.js";
import { showConfirmDelete } from "../ui/confirmDelete.js";
import { showHomeContent, showPlayContent } from "../ui/veiws.js";
import { contextMenuPlaylist } from "../ui/contextMenu.js";

import {
  closeModalPlaylist,
  getIsPublicState,
  setIsPublicState,
  showModalPlaylist,
} from "../ui/modalPlaylist.js";
import { getAccessToken } from "../utils/storage.js";

export default function initPlaylistEvents(playlistsArray, renderPlaylistFn) {
  const createBtn = document.querySelector(".create-btn");
  const libraryPlaylist = document.querySelector(".library-playlist");
  const choosePhotoBtn = document.querySelector("#choose-photo-btn");

  const playlistImgElement = document.querySelector(".item-icon img");
  const playListTitleElement = document.querySelector(".playlist-title");
  const playlistDescElement = document.querySelector(".playlis-description");
  const playlistTypeElement = document.querySelector(".playlist-type");
  const playlistOwnerElement = document.querySelector(".playlist-owner");
  const playlistModalName = document.querySelector("#playlist-modal-name");
  const deletePlayListBtn = document.querySelector(".delete-playlist");
  const deleteLibraryPlaylistBtn = document.querySelector(
    ".delete-library-playlist",
  );
  const editLibraryPlaylistBtn = document.querySelector(
    ".edit-library-playlist",
  );

  const playlistModalDesc = document.querySelector("#playlist-modal-desc");
  const modalSaveBtn = document.querySelector(".playlist-modal-save-btn");

  let currentActivePlaylistId = null;
  let playlistIdToDelete = null;
  contextMenuPlaylist((id) => {
    playlistIdToDelete = id;
  });

  if (createBtn) {
    createBtn.addEventListener("click", async (e) => {
      const isLogedIn = !!getAccessToken();
      if (!isLogedIn) return;

      try {
        const defaultPayLoad = {
          name: "My New Playlist",
          description: "Playlist description",
          is_public: true,
          image_url: "https://example.com/playlist-cover.jpg",
        };

        const res = await createPlaylistApi(defaultPayLoad);
        const newPlaylist = res?.playlist || res;

        if (newPlaylist) {
          currentActivePlaylistId = newPlaylist.id;
          setIsPublicState(true);

          if (playListTitleElement) {
            playListTitleElement.textContent = newPlaylist.name;
            playlistModalName.value = newPlaylist.name;
          }

          if (playlistDescElement) {
            playlistDescElement.textContent = newPlaylist.description;
          }
          if (playlistTypeElement) {
            playlistTypeElement.textContent = "Public Playlist";
          }
          if (playlistOwnerElement) {
            playlistOwnerElement.textContent = newPlaylist.user_name || "Me";
          }
          playlistsArray.unshift(newPlaylist);
          renderPlaylistFn(playlistsArray);
          showPlayContent();
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
      if (activeItem) activeItem.classList.remove("active");
      item.classList.add("active");
      showPlayContent();

      try {
        const res = await getPlaylistById(playlistId);
        const data = res?.playlist || res;

        if (data) {
          if (playListTitleElement) {
            playListTitleElement.textContent = data.name;
            playlistModalName.value = data.name;
          }
          if (playlistDescElement) {
            playlistDescElement.textContent = data.description;
          }
          if (playlistTypeElement) {
            playlistTypeElement.textContent = data.is_public
              ? "Public Playlist"
              : "Private Playlist";
          }
          if (playlistOwnerElement) {
            playlistOwnerElement.textContent = data.user_username || "Unknown";
          }
          if (playlistModalDesc) {
            playlistModalDesc.value = data.description || "";
          }

          const isPublic = data.is_public === 1 || data.is_public === true;
          setIsPublicState(isPublic);

          if (choosePhotoBtn) {
            const imgTag = choosePhotoBtn.querySelector("img");
            if (imgTag) {
              imgTag.src = data.image_url || "./placeholder.svg";
            } else if (data.image_url) {
              choosePhotoBtn.style.backgroundImage = `url('${data.image_url}')`;
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

  if (modalSaveBtn) {
    modalSaveBtn.addEventListener("click", async (e) => {
      if (!currentActivePlaylistId) return;

      const currentIsPublicState = getIsPublicState();
      const nameValue = playlistModalName ? playlistModalName.value.trim() : "";
      const descValue = playlistModalDesc ? playlistModalDesc.value.trim() : "";

      if (!nameValue) {
        alert("Playlist name cannot be empty!");
        return;
      }

      const jsonPayload = {
        name: nameValue,
        description: descValue,
        is_public: currentIsPublicState,
      };

      try {
        modalSaveBtn.disabled = true;
        modalSaveBtn.textContent = "Saving...";

        const res = await updatePlaylistById(
          currentActivePlaylistId,
          jsonPayload,
        );
        const updateData = res?.playlist || res?.data?.playlist || res;

        if (updateData) {
          if (playListTitleElement)
            playListTitleElement.textContent = updateData.name;
          if (playlistTypeElement) {
            playlistTypeElement.textContent = currentIsPublicState
              ? "Public Playlist"
              : "Private Playlist";
          }

          const playlistIndex = playlistsArray.findIndex(
            (p) => p.id === currentActivePlaylistId,
          );
          if (playlistIndex !== -1) {
            playlistsArray[playlistIndex].name = updateData.name;
            playlistsArray[playlistIndex].is_public = currentIsPublicState;

            renderPlaylistFn(playlistsArray);

            setTimeout(() => {
              const targetItem = libraryPlaylist.querySelector(
                `.library-item[data-id="${currentActivePlaylistId}"]`,
              );
              if (targetItem) targetItem.classList.add("active");
            }, 50);
          }

          closeModalPlaylist();
        }
      } catch (error) {
        console.error("Error update playlist", error);
      } finally {
        modalSaveBtn.disabled = false;
        modalSaveBtn.textContent = "Save";
      }
    });
  }

  if (editLibraryPlaylistBtn) {
    editLibraryPlaylistBtn.addEventListener("click", async () => {
      const targetPlaylistId = playlistIdToDelete || currentActivePlaylistId;

      if (!targetPlaylistId) return;

      try {
        const res = await getPlaylistById(targetPlaylistId);
        const data = res?.playlist || res;

        if (data) {
          if (playlistModalName) playlistModalName.value = data.name || "";
          if (playlistModalDesc)
            playlistModalDesc.value = data.description || "";

          const isPublic = data.is_public === 1 || data.is_public === true;
          setIsPublicState(isPublic);
          currentActivePlaylistId = targetPlaylistId;

          showModalPlaylist();
        }
      } catch (error) {
        console.error("Error fetching playlist data for editing:", error);
      } finally {
        const contextMenu = document.querySelector(".context-menu-playlist");
        if (contextMenu) contextMenu.style.display = "none";
        document.body.click();
      }
    });
  }

  if (deleteLibraryPlaylistBtn) {
    deleteLibraryPlaylistBtn.addEventListener("click", async () => {
      if (!playlistIdToDelete) return;

      const currentPlaylistName = playListTitleElement
        ? playListTitleElement.textContent
        : "this playlist";

      showConfirmDelete({
        title: "Delete from Your Library?",
        message: `This will delete ${currentPlaylistName} from Your Library.`,
        onConfirm: async () => {
          try {
            deleteLibraryPlaylistBtn.disabled = true;
            deleteLibraryPlaylistBtn.textContent = "Deleting...";

            await deletePlaylistById(playlistIdToDelete);

            // Update currentActivePlaylistId if deleting the current displayed playlist
            if (currentActivePlaylistId === playlistIdToDelete) {
              currentActivePlaylistId = null;
            }

            const currentIndex = playlistsArray.findIndex(
              (p) => p.id === playlistIdToDelete,
            );
            const updatedPlaylists = playlistsArray.filter(
              (p) => p.id !== playlistIdToDelete,
            );
            playlistsArray.length = 0;
            playlistsArray.push(...updatedPlaylists);
            renderPlaylistFn(playlistsArray);

            // Auto move to previous or next playlist
            if (currentActivePlaylistId === playlistIdToDelete) {
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
            }
          } catch (error) {
            console.error("Error delete playlist from context menu:", error);
          } finally {
            deleteLibraryPlaylistBtn.disabled = false;
            deleteLibraryPlaylistBtn.textContent = "Delete";
            const contextMenu = document.querySelector(
              ".context-menu-playlist",
            );
            if (contextMenu) contextMenu.style.display = "none";
            document.body.click();
            playlistIdToDelete = null;
          }
        },
      });
    });
  }

  const sortBtn = document.querySelector(".sort-btn");
  const dropdownSort = document.querySelector(".recent-dropdown");
  const btnGroup = document.querySelector(".btn-recent-drop");

  if (sortBtn && dropdownSort && btnGroup) {
    btnGroup.addEventListener("click", (e) => {
      const clickedBtn = e.target.closest("button");
      if (!clickedBtn) return;

      const currentActive = btnGroup.querySelector("button.is-active");
      if (currentActive) currentActive.classList.remove("is-active");
      clickedBtn.classList.add("is-active");

      const selectedText = clickedBtn.textContent.trim();
      sortBtn.textContent = "";

      const textNode = document.createTextNode(`${selectedText}`);
      const iconElement = document.createElement("i");
      iconElement.className = "fa-solid fa-list";

      sortBtn.append(textNode, iconElement);

      let sortedList = [...playlistsArray];

      if (clickedBtn.classList.contains("btn-recent")) {
        sortedList.sort(
          (a, b) =>
            new Date(b.updated_at || b.created_at) -
            new Date(a.updated_at || a.created_at),
        );
      } else if (clickedBtn.classList.contains("btn-recent-add")) {
        sortedList.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
      } else if (clickedBtn.classList.contains("btn-alpha")) {
        sortedList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "vi"),
        );
      } else if (clickedBtn.classList.contains("btn-create")) {
        sortedList.sort((a, b) => (b.is_owner || 0) - (a.is_owner || 0));
      }

      playlistsArray.length = 0;
      playlistsArray.push(...sortedList);
      renderPlaylistFn(playlistsArray);

      dropdownSort.classList.remove("show");
    });
  }
}
