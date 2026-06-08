export function renderHitAlbums(hits) {
  const hitGrid = document.querySelector(".hits-grid");

  hitGrid.replaceChildren();

  hits.forEach((hit) => {
    const hitCard = document.createElement("div");
    hitCard.className = "hit-card";

    const hitCover = document.createElement("div");
    hitCover.className = "hit-card-cover";

    const hitImg = document.createElement("img");
    hitImg.src = hit.cover_image_url;
    hitImg.alt = hit.title;

    const hitPlay = document.createElement("button");
    hitPlay.className = "hit-play-btn";

    const hitIconPlay = document.createElement("i");
    hitIconPlay.className = "fa-solid fa-play";

    hitPlay.appendChild(hitIconPlay);

    hitCover.append(hitImg, hitPlay);

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
