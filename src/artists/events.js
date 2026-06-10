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

  if (!artistsGrid) return;

  artistsGrid.addEventListener("click", async (e) => {
    const artistCard = e.target.closest(".artist-card");
    if (!artistCard) return;

    const artistId = artistCard.dataset.id;

    try {
      // artist detail
      const artist = await fetchArtistById(artistId);
      renderArtistDetail(artist);

      // popular tracks
      const popularTracks = await fetchArtistPopularTracks(artistId);
      renderArtistPopularTracks(popularTracks.tracks);

      showDetailContent();
    } catch (error) {
      console.log(error);
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
}
