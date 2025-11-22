// Origami Linux Single Page Interactions
(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const themeBtn = document.getElementById("themeBtn");
  const yearEl = document.getElementById("year");
  const themeController = window.__origamiTheme;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const updateThemeIcon = () => {
    if (!themeBtn || !themeController) return;
    themeBtn.textContent = themeController.get() === "dark" ? "🌙" : "☀️";
  };

  updateThemeIcon();

  themeBtn?.addEventListener("click", () => {
    themeController?.toggle();
    updateThemeIcon();
  });

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks?.classList.toggle("open");
  });

  navLinks?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLAnchorElement &&
      navLinks.classList.contains("open")
    ) {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
})();
