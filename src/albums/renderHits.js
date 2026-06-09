import { createMediaCover } from "../utils/helpers.js";

/**
 * renderHits.js - Chỉ chứa logic render DOM cho section Today's biggest hits
 * Không gọi API, không gắn event listener
 */

export function renderHitAlbums(hits) {
  const hitGrid = document.querySelector(".hits-grid");
  hitGrid.replaceChildren();

  hits.forEach((hit) => {
    const hitCard = document.createElement("div");
    hitCard.className = "hit-card";

    const hitCover = createMediaCover(
      "hit-card-cover",
      hit.cover_image_url,
      hit.title,
      "hit-play-btn",
    );

    const hitInfo = document.createElement("div");
    hitInfo.className = "hit-card-info";

    const hitTitle = document.createElement("div");
    hitTitle.className = "hit-card-title";
    hitTitle.textContent = hit.title;

    const hitArtist = document.createElement("div");
    hitArtist.className = "hit-card-artist";
    hitArtist.textContent = hit.artist_name;

    hitInfo.append(hitTitle, hitArtist);
    hitCard.append(hitCover, hitInfo);
    hitGrid.appendChild(hitCard);
  });
}
