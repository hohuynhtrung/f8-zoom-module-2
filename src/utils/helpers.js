/* Tạo nút Play cho card album/artist */
export function createPlayButton(btnClass) {
  const btn = document.createElement("button");
  btn.className = btnClass;

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-play";
  btn.appendChild(icon);

  return btn;
}

/* Tạo khối cover gồm ảnh + nút play (dùng chung hit-card & artist-card) */
export function createMediaCover(coverClass, imgSrc, imgAlt, playBtnClass) {
  const cover = document.createElement("div");
  cover.className = coverClass;

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const playBtn = createPlayButton(playBtnClass);
  cover.append(img, playBtn);

  return cover;
}
