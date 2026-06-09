import { fetchArtistById, fetchArtistPopularTracks } from "../api/artistApi.js";
import { renderArtistDetail } from "./renderArtistDetail.js";
import { renderArtistPopularTracks } from "./renderArtistPopularTracks.js";
import { showDetailContent } from "../ui/veiws.js";

export default function initArtistEvents() {
  const artistsGrid = document.querySelector(".artists-grid");
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
}
