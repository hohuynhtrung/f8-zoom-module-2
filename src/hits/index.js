import { fetchHits } from "../api/hitApi.js";
import initHitEvent from "./event.js";
import { renderHits } from "./renderHits.js";

export default async function initHits() {
  try {
    const resHit = await fetchHits();
    const hitsArray = resHit?.tracks || [];

    renderHits(hitsArray);
    initHitEvent(hitsArray);
  } catch (error) {
    console.error("Error init Hits list:", error);
  }
}
