export function renderArtistDetail(artist) {
  document.querySelector(".hero-background img").src =
    artist.background_image_url || artist.image_url;

  document.querySelector(".artist-name").textContent = artist.name;

  document.querySelector(".monthly-listeners").textContent =
    `${artist.monthly_listeners.toLocaleString()} monthly listeners`;

  document.querySelector(".verified-badge").style.display = artist.is_verified
    ? "flex"
    : "none";
}
