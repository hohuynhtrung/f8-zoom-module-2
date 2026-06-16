function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function renderArtistPopularTracks(tracks) {
  const musicList = document.querySelector(".music-list");

  musicList.replaceChildren();

  tracks.forEach((track, index) => {
    const musicItem = document.createElement("div");
    musicItem.className = "music-item";
    musicItem.dataset.id = track.id;

    const musicNumber = document.createElement("div");
    musicNumber.className = "music-number";
    musicNumber.textContent = index + 1;

    const musicImgWrapper = document.createElement("div");
    musicImgWrapper.className = "music-img";

    const musicImg = document.createElement("img");
    musicImg.src = track.image_url || track.album_cover || "./placeholder.svg";

    musicImg.alt = track.title;

    musicImgWrapper.appendChild(musicImg);

    const musicInfo = document.createElement("div");
    musicInfo.className = "music-info";
    musicInfo.textContent = track.title;

    const musicPlays = document.createElement("div");
    musicPlays.className = "music-plays";
    musicPlays.textContent = Number(track.play_count || 0).toLocaleString();

    const musicDuration = document.createElement("div");
    musicDuration.className = "music-duration";
    musicDuration.textContent = formatDuration(track.duration || 0);

    const musicMenu = document.createElement("button");
    musicMenu.className = "music-menu";

    const menuIcon = document.createElement("i");
    menuIcon.className = "fa-solid fa-ellipsis";

    musicMenu.appendChild(menuIcon);

    musicItem.append(
      musicNumber,
      musicImgWrapper,
      musicInfo,
      musicPlays,
      musicDuration,
      musicMenu,
    );

    musicList.appendChild(musicItem);
  });
}

export function updateActiveTrack(currentTrackId) {
  const musicItems = document.querySelectorAll(".music-item");

  musicItems.forEach((item, index) => {
    const isActive = item.dataset.id == currentTrackId;
    item.classList.toggle("active", isActive);

    const numberEl = item.querySelector(".music-number");
    const menuEl = item.querySelector(".music-menu");

    if (numberEl) {
      if (isActive) {
        numberEl.textContent = "";
        const iconPlay = document.createElement("i");
        iconPlay.className = "fa-solid fa-volume-high";
        numberEl.appendChild(iconPlay);
      } else {
        numberEl.className = "music-number";
        numberEl.textContent = index + 1;
      }
    }
    if (menuEl) {
      menuEl.classList.toggle("active", isActive);
    }
  });
}
