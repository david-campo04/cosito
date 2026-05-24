/** Imagenes de respaldo para videos y secciones sin archivo local. */
const IMAGE_FALLBACKS = {
  inicio: "assets/images/hero-rc.jpg",
  carga: "assets/images/video-carga.jpg",
  descarga: "assets/images/video-descarga.jpg",
};

document.querySelectorAll("video").forEach((video) => {
  const sectionId = video.closest("section")?.id;
  const fallbackSrc = IMAGE_FALLBACKS[sectionId];

  if (fallbackSrc) {
    video.setAttribute("poster", fallbackSrc);
  }

  const showFallback = () => {
    if (video.dataset.fallback) return;
    video.dataset.fallback = "true";

    const img = document.createElement("img");
    img.src = fallbackSrc || "assets/images/hero-rc.jpg";
    img.alt = sectionId ? `Ilustracion: ${sectionId}` : "Circuito RC";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:-1;opacity:0.35;";
    video.parentElement?.insertBefore(img, video);
    video.style.display = "none";
  };

  video.addEventListener("error", showFallback);
  setTimeout(() => {
    if (video.networkState === 3) showFallback();
  }, 2000);
});
