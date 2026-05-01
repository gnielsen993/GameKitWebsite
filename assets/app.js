// Carousel: drag-to-scroll + chevron buttons. Mirrors Strada interaction model.
(function () {
  function initCarousel() {
    const track = document.querySelector(".carousel-track");
    if (!track) return;

    let isDown = false, startX, scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener("mouseleave", () => { isDown = false; });
    track.addEventListener("mouseup", () => { isDown = false; });
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    const carousel = track.closest(".screenshot-carousel");
    if (!carousel) return;
    const prevBtn = carousel.querySelector('.carousel-btn[data-dir="prev"]');
    const nextBtn = carousel.querySelector('.carousel-btn[data-dir="next"]');
    if (!prevBtn || !nextBtn) return;

    function pageWidth() {
      const first = track.querySelector("img, .shot-placeholder");
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const step = first ? first.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
      return Math.min(step * 2, track.clientWidth * 0.9);
    }

    function updateDisabled() {
      const max = track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= max;
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -pageWidth(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: pageWidth(), behavior: "smooth" });
    });
    track.addEventListener("scroll", updateDisabled, { passive: true });
    window.addEventListener("resize", updateDisabled);
    updateDisabled();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousel);
  } else {
    initCarousel();
  }
})();
