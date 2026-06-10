export function renderHitDetail(hit) {
  document.querySelector(".hero-background img").src =
    hit.album_cover_image_url;
  document.querySelector(".artist-name").textContent = hit.artist_name;
}
