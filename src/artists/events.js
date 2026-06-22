import { getAccessToken } from "../utils/storage.js";
import {
  fetchArtistById,
  fetchArtistPopularTracks,
  followArtist,
  unfollowArtist,
} from "../api/artistApi.js";
import { renderArtistDetail } from "./renderArtistDetail.js";
import {
  renderArtistPopularTracks,
  updateActiveTrack,
} from "./renderArtistPopularTracks.js";
import { showDetailContent } from "../ui/veiws.js";
import { loadFollowingList } from "./index.js";
import { contextMenuArtist } from "../ui/contextMenu.js";
import { audioPlayer } from "../utils/audioPlayer.js";
import { playTrackApi } from "../api/hitApi.js";

export default function initArtistEvents(artistsArray, renderArtistFn) {
  const artistsGrid = document.querySelector(".artists-grid");
  const followBtn = document.querySelector(".follow-btn");

  const libraryArtists = document.querySelector(".library-artists");

  let localPopularTracks = [];

  let currentActiveArtistId = null;
  let artistIdToUnfollow = null;
  contextMenuArtist((id) => {
    artistIdToUnfollow = id;
  });

  const contextMenu = document.querySelector(".context-menu-artist");
  const unfollowBtn = document.querySelector(".unfollow-library-artist");

  if (!artistsGrid) return;

  artistsGrid.addEventListener("click", async (e) => {
    const artistCard = e.target.closest(".artist-card");
    if (!artistCard) return;

    const artistId = artistCard.dataset.id;
    currentActiveArtistId = artistId;
    try {
      showDetailContent();
      // artist detail
      const artist = await fetchArtistById(artistId);
      renderArtistDetail(artist);

      // popular tracks
      const popularTracks = await fetchArtistPopularTracks(artistId);
      const tracks = popularTracks?.tracks || [];
      localPopularTracks = tracks.map((track) => ({
        ...track,
        artist_name: artist.name || artist.artist_name,
      }));
      renderArtistPopularTracks(localPopularTracks);

      if (followBtn) {
        const serverFollowStatus =
          artist.is_following === true ||
          artist.is_following === 1 ||
          artist.isFollowing === true;

        followBtn.dataset.following = serverFollowStatus ? "true" : "false";
        followBtn.textContent = serverFollowStatus ? "Following" : "Follow";
        followBtn.dataset.artistId = artistId;
      }
    } catch (error) {
      console.error(error);
    }
  });

  if (followBtn) {
    followBtn.addEventListener("click", async (e) => {
      const isLoggedIn = !!getAccessToken();
      if (!isLoggedIn) return;

      const artistId = followBtn.dataset.artistId;

      if (!artistId) return;

      const isFollowing = followBtn.dataset.following === "true";

      try {
        if (isFollowing) {
          await unfollowArtist(artistId);
          followBtn.dataset.following = "false";
          followBtn.textContent = "Follow";
        } else {
          await followArtist(artistId);
          followBtn.dataset.following = "true";
          followBtn.textContent = "Following";
        }

        await loadFollowingList();
      } catch (error) {
        console.error("Error change follow status:", error);
      }
    });
  }

  if (libraryArtists) {
    libraryArtists.addEventListener("click", async (e) => {
      const item = e.target.closest(".library-item");
      if (!item) return;

      const artistId = item.dataset.id;
      if (!artistId) return;

      currentActiveArtistId = artistId;

      const activeItem = libraryArtists.querySelector(".library-item.active");
      if (activeItem) activeItem.classList.remove("active");
      item.classList.add("active");
      showDetailContent();
      try {
        const artist = await fetchArtistById(artistId);
        const popularTracks = await fetchArtistPopularTracks(artistId);
        localPopularTracks = popularTracks?.tracks || [];
        renderArtistDetail(artist);
        renderArtistPopularTracks(localPopularTracks);
        if (followBtn) {
          const serverFollowingState =
            artist.is_following === true || artist.is_following === 1;

          // Đồng bộ lại attribute ngầm và chữ hiển thị theo đúng thực tế Database
          followBtn.dataset.following = serverFollowingState ? "true" : "false";
          followBtn.textContent = serverFollowingState ? "Following" : "Follow";

          followBtn.dataset.artistId = artistId;
        }
      } catch (error) {
        console.error("Error get artist detail", error);
      }
    });
  }

  if (unfollowBtn) {
    unfollowBtn.addEventListener("click", async () => {
      if (!artistIdToUnfollow) return;

      try {
        unfollowBtn.disabled = true;
        unfollowBtn.textContent = "Unfollowing...";

        await unfollowArtist(artistIdToUnfollow);
        if (followBtn && currentActiveArtistId === artistIdToUnfollow) {
          followBtn.dataset.following = "false";
          followBtn.textContent = "Follow";
        }

        await loadFollowingList();
      } catch (error) {
        console.error("Error unfollow artist via context menu:", error);
      } finally {
        unfollowBtn.disabled = false;
        unfollowBtn.textContent = "Unfollow";
        if (contextMenu) contextMenu.style.display = "none";
        window.removeEventListener("wheel", (e) => e.preventDefault());
        document.body.click();
        artistIdToUnfollow = null;
      }
    });
  }

  const musicList = document.querySelector(".music-list");
  if (musicList) {
    musicList.addEventListener("click", async (e) => {
      const mucsicItem = e.target.closest(".music-item");
      if (!mucsicItem) return;

      const trackId = mucsicItem.dataset.id;
      if (!trackId) return;

      const clickedIndex = localPopularTracks.findIndex(
        (popular) => popular.id == trackId,
      );
      if (clickedIndex !== -1) {
        audioPlayer.setPlaylist(localPopularTracks, clickedIndex);
      }

      try {
        const res = await playTrackApi(trackId);
        const trackData = res?.track || res?.data?.track || res;
        if (trackData) {
          const playerImg = document.querySelector(".player-img");
          const playerTitle = document.querySelector(".player-title");
          const playerArtist = document.querySelector(".player-artist");

          if (playerImg) {
            playerImg.src = trackData.image_url || "./placeholder.svg";
          }

          if (playerTitle) {
            playerTitle.textContent = trackData.title || "Unknow Title";
          }

          if (playerArtist) {
            playerArtist.textContent = trackData.artist_name || "Unknow Aritst";
          }

          audioPlayer.play(trackData.audio_url);
          updateActiveTrack(trackId);
        }
      } catch (error) {
        console.error(
          "Error when processing music playback from Artist Popular",
          error,
        );
      }
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

      if (!artistsArray || !Array.isArray(artistsArray)) {
        console.warn(
          "artistsArray chưa được truyền vào hoặc không hợp lệ. Không thể thực hiện Sort!",
        );
        dropdownSort.classList.remove("show");
        return; // Dừng hàm luôn để không bị lỗi "not iterable"
      }
      let sortList = [...artistsArray];

      if (clickedBtn.classList.contains("btn-recent")) {
        sortList.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
      } else if (clickedBtn.classList.contains("btn-alpha")) {
        sortList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "vi"),
        );
      }

      artistsArray.length = 0;
      artistsArray.push(...sortList);

      if (typeof renderArtistFn === "function") {
        renderArtistFn(artistsArray);
      }

      dropdownSort.classList.remove("show");
    });
  }
}
