import { audioPlayer } from "../utils/audioPlayer.js";

export function initFooterControls() {
  const mainPlayBtn = document.querySelector(".js-play-btn");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const shuffleBtn = document.querySelector(".shuffle-btn");
  const repeatBtn = document.querySelector(".repeat-btn");

  const volumeBar = document.querySelector(".volume-bar");
  const volumeFill = document.querySelector(".volume-fill");
  const volumeBtn = document.querySelector(".volume-btn");

  if (mainPlayBtn)
    mainPlayBtn.addEventListener("click", () => audioPlayer.toggle());
  if (nextBtn) {
    nextBtn.addEventListener("click", () => audioPlayer.next());
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => audioPlayer.prev());
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => audioPlayer.toggleShuffle());
  }

  if (repeatBtn) {
    repeatBtn.addEventListener("click", () => audioPlayer.toggleRepeat());
  }

  if (volumeBar && volumeFill) {
    volumeBar.addEventListener("click", (e) => {
      const barWidth = volumeBar.clientWidth;
      const clickX = e.offsetX;

      let volumePercent = clickX / barWidth;

      if (volumePercent < 0) volumePercent = 0;
      if (volumePercent > 1) volumePercent = 1;

      volumeFill.style.width = `${volumePercent * 100}%`;

      audioPlayer.setVolume(volumePercent);

      const volumeIcon = volumeBtn.querySelector("i");
      if (volumeIcon) {
        if (volumePercent === 0) {
          volumeIcon.className = "fa-solid fa-volume-xmark"; // Tắt tiếng
        } else if (volumePercent < 0.5) {
          volumeIcon.className = "fa-solid fa-volume-low"; // Âm lượng nhỏ
        } else {
          volumeIcon.className = "fa-solid fa-volume-high"; // Âm lượng lớn
        }
      }
    });
  }
}
