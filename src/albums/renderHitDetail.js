export function renderHitDetail(hit) {
  document.querySelector(".hero-background img").src = hit.artist_image_url;

  document.querySelector(".artist-name").textContent = hit.title;

  // document.querySelector(".monthly-listeners").textContent =
  //   `${hit.monthly_listeners.toLocaleString()} monthly listeners`;

  // document.querySelector(".verified-badge").style.display = hit.is_verified
  //   ? "flex"
  //   : "none";
}
