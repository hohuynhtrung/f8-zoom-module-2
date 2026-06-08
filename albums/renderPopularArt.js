export function renderPopularArt(artists) {
  const artistsGrid = document.querySelector(".artists-grid");

  artistsGrid.replaceChildren();

  artists.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.className = "artist-card";

    const artistCardCover = document.createElement("div");
    artistCardCover.className = "artist-card-cover";

    const artistImage = document.createElement("img");
    artistImage.src = artist.image_url || artist.artist_image_url;
    artistImage.alt = artist.name;

    const artistPlayBtn = document.createElement("button");
    artistPlayBtn.className = "artist-play-btn";

    const playIcon = document.createElement("i");
    playIcon.className = "fa-solid fa-play";

    artistPlayBtn.appendChild(playIcon);
    artistCardCover.append(artistImage, artistPlayBtn);

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
