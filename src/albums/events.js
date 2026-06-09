import { fetchHitById, fetchHitPopularTracks } from "../api/albumApi.js";
import { renderHitDetail } from "./renderHitDetail.js";
import { renderHitPopularTracks } from "./renderHitPopularTracks.js";
import { showDetailContent } from "../ui/veiws.js";

export default function initAlbumEvents() {
  const hitsGrid = document.querySelector(".hits-grid");

  if (!hitsGrid) return;

  hitsGrid.addEventListener("click", async (e) => {
    const hitCard = e.target.closest(".hit-card");
    if (!hitCard) return;

    const hitId = hitCard.dataset.id;

    try {
      const hit = await fetchHitById(hitId);
      renderHitDetail(hit);

      const popularTracks = await fetchHitPopularTracks(hitId);
      renderHitPopularTracks(popularTracks.tracks);
      showDetailContent();
    } catch (error) {
      console.log(error);
    }
  });
}
