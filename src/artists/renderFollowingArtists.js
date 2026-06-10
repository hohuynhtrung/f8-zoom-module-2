export function renderFollowingArtists(artists = []) {
  const libraryList = document.querySelector(".library-content");

  if (!libraryList) return;

  libraryList.replaceChildren();

  artists.forEach((artist) => {
    const libraryItem = document.createElement("div");
    libraryItem.className = "library-item";
    libraryItem.dataset.id = artist.id;

    const libraryImg = document.createElement("img");
    libraryImg.className = "item-image";
    libraryImg.src = artist.image_url || "default-avatar.png";
    libraryImg.alt = artist.name;

    const libraryInfo = document.createElement("div");
    libraryInfo.className = "item-info";

    const libraryTitle = document.createElement("div");
    libraryTitle.className = "item-title";
    libraryTitle.textContent = artist.name;

    const librarySub = document.createElement("div");
    librarySub.className = "item-subtitle";
    librarySub.textContent = "Artist";

    libraryInfo.append(libraryTitle, librarySub);
    libraryItem.append(libraryImg, libraryInfo);

    libraryList.appendChild(libraryItem);
  });
}
