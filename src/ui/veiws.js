// artists
const homeContent = document.querySelector(".home-content");
const detailContent = document.querySelector(".detail-content");
const playContent = document.querySelector(".playlist-content");

const homeBtn = document.querySelector(".home-btn");
const createBtn = document.querySelector(".create-btn");

//nav btn
const playlistBtn = document.querySelector(".playlist-btn");
const libPlaylist = document.querySelector(".library-playlist");
const artistsBtn = document.querySelector(".artists-btn");
const libArtists = document.querySelector(".library-artists");

homeBtn.addEventListener("click", () => {
  showHomeContent();
});

createBtn.addEventListener("click", () => {
  showPlayContent();
});

export function showHomeContent() {
  homeContent.classList.remove("hidden");
  detailContent.classList.add("hidden");
  playContent.classList.add("hidden");
}

export function showDetailContent() {
  detailContent.classList.remove("hidden");
  homeContent.classList.add("hidden");
  playContent.classList.add("hidden");
}

export function showPlayContent() {
  playContent.classList.remove("hidden");
  homeContent.classList.add("hidden");
  detailContent.classList.add("hidden");
}

playlistBtn.addEventListener("click", () => {
  showPlayListNav();
});

artistsBtn.addEventListener("click", () => {
  showArtistsNav();
});

export function showPlayListNav() {
  playlistBtn.classList.add("active");
  artistsBtn.classList.remove("active");

  libPlaylist.classList.remove("hidden");
  libArtists.classList.add("hidden");
}

export function showArtistsNav() {
  artistsBtn.classList.add("active");
  playlistBtn.classList.remove("active");

  libArtists.classList.remove("hidden");
  libPlaylist.classList.add("hidden");
}
