/** Ampliacion de diagramas: hover = vista previa, clic = modal fijo. */
(function () {
  const lightbox = document.getElementById("diagram-lightbox");
  if (!lightbox) return;

  const backdrop = lightbox.querySelector(".diagram-lightbox__backdrop");
  const closeBtn = lightbox.querySelector(".diagram-lightbox__close");
  const lightboxImg = lightbox.querySelector(".diagram-lightbox__img");
  const lightboxCaption = lightbox.querySelector(".diagram-lightbox__caption");
  const hoverPreview = document.getElementById("diagram-hover-preview");
  const hoverImg = hoverPreview?.querySelector("img");
  const hoverCaption = hoverPreview?.querySelector("p");

  let hoverTimer = null;
  let pinned = false;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("diagram-zoom-open");
    pinned = true;
    hideHoverPreview();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("diagram-zoom-open");
    pinned = false;
  }

  function showHoverPreview(src, alt, frame) {
    if (pinned || !hoverPreview || !hoverImg) return;

    hoverImg.src = src;
    hoverImg.alt = alt;
    if (hoverCaption) hoverCaption.textContent = alt;

    const rect = frame.getBoundingClientRect();
    const previewW = Math.min(window.innerWidth * 0.55, 720);
    const previewH = Math.min(window.innerHeight * 0.72, 560);

    let left = rect.right + 16;
    if (left + previewW > window.innerWidth - 16) {
      left = rect.left - previewW - 16;
    }
    if (left < 16) left = (window.innerWidth - previewW) / 2;

    let top = rect.top + rect.height / 2 - previewH / 2;
    top = Math.max(16, Math.min(top, window.innerHeight - previewH - 16));

    hoverPreview.style.width = `${previewW}px`;
    hoverPreview.style.height = `${previewH}px`;
    hoverPreview.style.left = `${left}px`;
    hoverPreview.style.top = `${top}px`;
    hoverPreview.classList.add("visible");
    hoverPreview.setAttribute("aria-hidden", "false");
  }

  function hideHoverPreview() {
    if (!hoverPreview) return;
    hoverPreview.classList.remove("visible");
    hoverPreview.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".tech-diagram").forEach((img) => {
    const frame = img.closest(".image-frame");
    if (!frame) return;

    frame.classList.add("zoomable");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("role", "button");
    frame.setAttribute("aria-label", `Ampliar: ${img.alt}`);

    frame.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        showHoverPreview(img.src, img.alt, frame);
      }, 180);
    });

    frame.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      hideHoverPreview();
    });

    frame.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img.src, img.alt);
    });

    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
