import { fetchHits } from "../api/hitApi.js";
import initHitEvent from "./event.js";
import { renderHits } from "./renderHits.js";

export default async function initHits() {
  initHitEvent();
  try {
    const resHit = await fetchHits();

    renderHits(resHit?.tracks || []);
  } catch (error) {
    console.error("Error init Hits list:", error);
  }
}
