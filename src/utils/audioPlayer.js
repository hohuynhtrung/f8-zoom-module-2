import { updateActiveTrack } from "../artists/renderArtistPopularTracks.js";

const globalAudio = new Audio();
const progressBar = document.querySelector(".progress-bar");
let isPlayingPromise = null;

export const audioPlayer = {
  currentPlaylist: [],
  currentIndex: 0,

  isShuffle: false,
  isRepeat: false,

  setPlaylist(playlist, startIndex = 0) {
    this.currentIndex = startIndex;
    this.currentPlaylist = playlist;
  },
  play(audioUrl) {
    if (!audioUrl) return;

    globalAudio.pause();
    globalAudio.src = audioUrl;
    isPlayingPromise = globalAudio.play();

    if (isPlayingPromise !== undefined) {
      isPlayingPromise
        .then(() => {
          updatePlayButtonIcon(true);
        })
        .catch((err) => {
          // Bắt lỗi AbortError ngầm
          if (err.name === "AbortError") {
            console.log(
              "System auto skip the previous playback command to the new song.",
            );
          } else {
            console.error("Error playback music:", err);
          }
          updatePlayButtonIcon(false);
        });
    }
  },

  toggle() {
    if (!globalAudio.src) return;

    if (globalAudio.paused) {
      isPlayingPromise = globalAudio.play();
      isPlayingPromise.then(() => updatePlayButtonIcon(true)).catch(() => {});
    } else {
      globalAudio.pause();
      updatePlayButtonIcon(false);
    }
  },
  next() {
    if (this.currentPlaylist.length === 0) return;
    if (this.isShuffle) {
      this.currentIndex = Math.floor(
        Math.random() * this.currentPlaylist.length,
      );
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.currentPlaylist.length;
    }
    this.playCurrentIndex();
  },
  prev() {
    if (this.currentPlaylist.length === 0) return;
    if (this.isShuffle) {
      this.currentIndex = Math.floor(
        Math.random() * this.currentPlaylist.length,
      );
    } else {
      this.currentIndex =
        (this.currentIndex - 1 + this.currentPlaylist.length) %
        this.currentPlaylist.length;
    }
    this.playCurrentIndex();
  },
  playCurrentIndex() {
    const trackData = this.currentPlaylist[this.currentIndex];
    if (!trackData) return;

    const playerImg = document.querySelector(".player-img");
    const playerTitle = document.querySelector(".player-title");
    const playerArtist = document.querySelector(".player-artist");

    if (playerImg) playerImg.src = trackData.image_url || "./placeholder.svg";
    if (playerTitle)
      playerTitle.textContent =
        trackData.title || trackData.name || "Unknown Title";
    if (playerArtist)
      playerArtist.textContent = trackData.artist_name || "Unknown Artist";

    this.play(trackData.audio_url);

    if (typeof updateActiveTrack === "function") {
      updateActiveTrack(trackData.id);
    }
  },
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    const shuffleBtn = document.querySelector(".shuffle-btn");
    if (shuffleBtn) {
      shuffleBtn.classList.toggle("active-control", this.isShuffle);
      shuffleBtn.setAttribute(
        "data-tooltip",
        this.isShuffle ? "Disable shuffle" : "Enable shuffle",
      );
    }
  },
  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    const repeatBtn = document.querySelector(".repeat-btn");
    if (repeatBtn) {
      repeatBtn.classList.toggle("active-control", this.isRepeat);
      repeatBtn.setAttribute(
        "data-tooltip",
        this.isRepeat ? "Disable repeat" : "Enable repeat",
      );
    }
  },
  setVolume(value) {
    globalAudio.volume = value;
  },
};

function updatePlayButtonIcon(isPlaying) {
  const playBtn = document.querySelector(".js-play-btn");
  const playIcon = document.querySelector(".js-play-btn i");
  if (!playIcon || !playBtn) return;

  if (isPlaying) {
    playIcon.className = "fa-solid fa-pause";
    playBtn.setAttribute("data-tooltip", "Pause");
  } else {
    playIcon.className = "fa-solid fa-play";
    playBtn.setAttribute("data-tooltip", "Play");
  }
}

globalAudio.addEventListener("timeupdate", () => {
  const currentTimeElement = document.querySelector(".current-time");
  const progressFill = document.querySelector(".progress-fill");

  if (!globalAudio.duration) return;

  const percent = (globalAudio.currentTime / globalAudio.duration) * 100;
  if (progressFill) progressFill.style.width = `${percent}%`;

  if (currentTimeElement) {
    currentTimeElement.textContent = formatTime(globalAudio.currentTime);
  }
});

globalAudio.addEventListener("ended", () => {
  if (audioPlayer.isRepeat) {
    globalAudio.currentTime = 0;
    globalAudio.play().catch(() => {});
  } else {
    audioPlayer.next();
  }
});

globalAudio.addEventListener("loadedmetadata", () => {
  const totalTimeElement = document.querySelector(".total-time");
  if (totalTimeElement) {
    totalTimeElement.textContent = formatTime(globalAudio.duration);
  }
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

if (progressBar) {
  progressBar.addEventListener("click", (e) => {
    if (!globalAudio.src || isNaN(globalAudio.duration)) return;

    const barWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    const clickPercent = clickX / barWidth;

    globalAudio.currentTime = clickPercent * globalAudio.duration;
  });
}
