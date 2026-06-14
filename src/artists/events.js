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

export default function initArtistEvents() {
  const artistsGrid = document.querySelector(".artists-grid");
  const followBtn = document.querySelector(".follow-btn");

  const libraryArtists = document.querySelector(".library-artists");

  if (!artistsGrid) return;

  artistsGrid.addEventListener("click", async (e) => {
    const artistCard = e.target.closest(".artist-card");
    if (!artistCard) return;

    const artistId = artistCard.dataset.id;

    try {
      showDetailContent();
      // artist detail
      const artist = await fetchArtistById(artistId);
      renderArtistDetail(artist);

      // popular tracks
      const popularTracks = await fetchArtistPopularTracks(artistId);
      renderArtistPopularTracks(popularTracks.tracks);
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

      const activeItem = libraryArtists.querySelector(".library-item.active");
      if (activeItem) activeItem.classList.remove("active");
      item.classList.add("active");
      showDetailContent();
      try {
        const artist = await fetchArtistById(artistId);
        const popularTracks = await fetchArtistPopularTracks(artistId);
        renderArtistDetail(artist);
        renderArtistPopularTracks(popularTracks.tracks);
      } catch (error) {
        console.error("Error get artist detail", error);
      }
    });
  }
}
