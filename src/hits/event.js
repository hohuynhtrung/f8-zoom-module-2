import { fetchHitById } from "../api/hitApi.js";
import { showDetailContent } from "../ui/veiws.js";
import { renderHitDetail } from "./renderHitDetail.js";

export default function initHitEvent() {
  const hitsGrid = document.querySelector(".hits-grid");
  if (!hitsGrid) return;

  hitsGrid.addEventListener("click", async (e) => {
    const hitCard = e.target.closest(".hit-card");
    if (!hitCard) return;

    const hitId = hitCard.dataset.id;

    try {
      const hit = await fetchHitById(hitId);
      renderHitDetail(hit);
      showDetailContent();
    } catch (error) {
      console.error(error);
    }
  });
}
