import {
  fetchArtistById,
  fetchArtistPopularTracks,
  followArtist,
  unfollowArtist,
} from "../api/artistApi.js";
import { renderArtistDetail } from "./renderArtistDetail.js";
import { renderArtistPopularTracks } from "./renderArtistPopularTracks.js";
import { showDetailContent } from "../ui/veiws.js";
import { loadFollowingList } from "./index.js";
import { contextMenuArtist } from "../ui/contextMenu.js";

export default function initArtistEvents() {
  const artistsGrid = document.querySelector(".artists-grid");
  const followBtn = document.querySelector(".follow-btn");

  const libraryArtists = document.querySelector(".library-artists");

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
      renderArtistPopularTracks(popularTracks.tracks);

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
        renderArtistDetail(artist);
        renderArtistPopularTracks(popularTracks.tracks);
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
}
