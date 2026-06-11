export function renderPlaylist(playlists) {
  const libraryPlaylist = document.querySelector(".library-playlist");

  if (!libraryPlaylist) {
    return;
  }
  libraryPlaylist.replaceChildren();

  playlists.forEach((playlist) => {
    const libraryItem = document.createElement("div");
    libraryItem.className = "library-item";
    libraryItem.dataset.id = playlist.id;

    const itemIconWrapper = document.createElement("div");
    itemIconWrapper.className = "item-icon";

    const playlistImg = document.createElement("img");
    playlistImg.src = playlist.image_url || "./placeholder.svg";
    playlistImg.alt = playlist.name || "Playlist Cover";

    itemIconWrapper.appendChild(playlistImg);

    const itemInfo = document.createElement("div");
    itemInfo.className = "item-info";

    const itemTitle = document.createElement("div");
    itemTitle.className = "item-title";
    itemTitle.textContent = playlist.name || "Untitled Playlist";

    const itemSubtitle = document.createElement("div");
    itemSubtitle.className = "item-subtitle";

    const subtitleText = document.createTextNode(
      ` Playlist • ${playlist.artist_name || playlist.user_username || "Unknown"}`,
    );

    itemSubtitle.appendChild(subtitleText);

    itemInfo.append(itemTitle, itemSubtitle);
    libraryItem.append(itemIconWrapper, itemInfo);

    libraryPlaylist.appendChild(libraryItem);
  });
}
