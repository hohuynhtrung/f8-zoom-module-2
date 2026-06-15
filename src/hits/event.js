import { playTrackApi } from "../api/hitApi.js";
import { audioPlayer } from "../utils/audioPlayer.js";

export default function initHitEvent(currentHitsArray) {
  const hitGrid = document.querySelector(".hits-grid");
  if (!hitGrid) return;

  hitGrid.addEventListener("click", async (e) => {
    const hitCard = e.target.closest(".hit-card");
    if (!hitCard) return;

    const trackId = hitCard.dataset.id;
    if (!trackId) return;

    const clickedIndex = currentHitsArray?.findIndex(
      (hit) => hit.id == trackId,
    );
    if (clickedIndex !== undefined && clickedIndex !== -1) {
      audioPlayer.setPlaylist(currentHitsArray, clickedIndex);
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
      }
    } catch (error) {
      console.error("Error when processing music playback from HitCard", error);
    }
  });
}
