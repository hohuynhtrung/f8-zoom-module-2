function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function renderHitPopularTracks(hits) {
  const musicList = document.querySelector(".music-list");

  musicList.replaceChildren();

  hits.forEach((hit, index) => {
    const musicItem = document.createElement("div");
    musicItem.className = "music-item";

    const musicNumber = document.createElement("div");
    musicNumber.className = "music-number";
    musicNumber.textContent = index + 1;

    const musicImgWrapper = document.createElement("div");
    musicImgWrapper.className = "music-img";

    const musicImg = document.createElement("img");
    musicImg.src = hit.image_url || hit.album_cover || "./placeholder.svg";

    musicImg.alt = hit.title;

    musicImgWrapper.appendChild(musicImg);

    const musicInfo = document.createElement("div");
    musicInfo.className = "music-info";
    musicInfo.textContent = hit.title;

    const musicPlays = document.createElement("div");
    musicPlays.className = "music-plays";
    musicPlays.textContent = Number(hit.play_count || 0).toLocaleString();

    const musicDuration = document.createElement("div");
    musicDuration.className = "music-duration";
    musicDuration.textContent = formatDuration(hit.duration || 0);

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
