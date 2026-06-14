function preventDefaultScroll(e) {
  e.preventDefault();
}

export function contextMenuArtist(onArtistIdFound) {
  const libraryArtists = document.querySelector(".library-artists");
  const contextMenu = document.querySelector(".context-menu-artist");

  if (!libraryArtists || !contextMenu) return;

  libraryArtists.addEventListener("contextmenu", (e) => {
    const item = e.target.closest(".library-item");
    if (!item) return;

    const artistId = item.dataset.id;
    if (!artistId) return;

    e.preventDefault();

    if (typeof onArtistIdFound === "function") {
      onArtistIdFound(artistId);
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    contextMenu.style.display = "block";
    contextMenu.style.left = `${mouseX}px`;
    contextMenu.style.top = `${mouseY}px`;

    window.addEventListener("wheel", preventDefaultScroll, { passive: false }); // Chặn con lăn chuột
    window.addEventListener("touchmove", preventDefaultScroll, {
      passive: false,
    });
  });

  function unlockScroll() {
    contextMenu.style.display = "none";

    window.removeEventListener("wheel", preventDefaultScroll);
    window.removeEventListener("touchmove", preventDefaultScroll);
  }

  document.addEventListener("click", (e) => {
    if (!contextMenu.contains(e.target)) {
      unlockScroll();
    }
  });
}
