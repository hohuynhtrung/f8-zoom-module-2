import { createMediaCover } from "../utils/helpers.js";

export function renderHits(hits) {
  const hitsGrid = document.querySelector(".hits-grid");

  hitsGrid.replaceChildren();

  hits.forEach((hit) => {
    const hitCard = document.createElement("div");
    hitCard.className = "hit-card";
    hitCard.dataset.id = hit.id;

    const hitCardCover = createMediaCover(
      "hit-card-cover",
      hit.image_url || hit.artist_image_url,
      hit.title,
      "hit-play-btn",
    );

    const hitCardInfo = document.createElement("div");
    hitCardInfo.className = "hit-card-info";

    const hitCardArtist = document.createElement("div");
    hitCardArtist.className = "hit-card-artist";
    hitCardArtist.textContent = hit.artist_name;

    const hitCardTitle = document.createElement("div");
    hitCardTitle.className = "hit-card-title";
    hitCardTitle.textContent = hit.title;

    hitCardInfo.append(hitCardTitle, hitCardArtist);
    hitCard.append(hitCardCover, hitCardInfo);
    hitsGrid.appendChild(hitCard);
  });
}
