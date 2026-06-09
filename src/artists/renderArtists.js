import { createMediaCover } from "../utils/helpers.js";

export function renderArtists(artists) {
  const artistsGrid = document.querySelector(".artists-grid");
  artistsGrid.replaceChildren();

  artists.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.className = "artist-card";
    artistCard.dataset.id = artist.id;

    const artistCardCover = createMediaCover(
      "artist-card-cover",
      artist.image_url || artist.artist_image_url,
      artist.name,
      "artist-play-btn",
    );

    const artistCardInfo = document.createElement("div");
    artistCardInfo.className = "artist-card-info";

    const artistCardName = document.createElement("div");
    artistCardName.className = "artist-card-name";
    artistCardName.textContent = artist.name;

    const artistCardType = document.createElement("div");
    artistCardType.className = "artist-card-type";
    artistCardType.textContent = "Artist";

    artistCardInfo.append(artistCardName, artistCardType);
    artistCard.append(artistCardCover, artistCardInfo);
    artistsGrid.appendChild(artistCard);
  });
}
