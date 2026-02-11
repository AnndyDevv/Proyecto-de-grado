document.addEventListener("DOMContentLoaded", () => {
  const brandTitle = document.querySelector(".brand h1");
  if (brandTitle) {
    const brandTarget = brandTitle.querySelector("a") || brandTitle;
    if (!brandTarget.querySelector(".brand-title-name")) {
      const rawTitle = brandTarget.textContent.replace(/\s+/g, " ").trim();
      const nameOnly = rawTitle.replace(/^U\.?\s*E\.?\s*/i, "").trim();
      if (nameOnly) {
        brandTarget.textContent = "";
        const ueSpan = document.createElement("span");
        ueSpan.className = "brand-title-ue";
        ueSpan.textContent = "U.E";
        const nameSpan = document.createElement("span");
        nameSpan.className = "brand-title-name";
        nameSpan.textContent = nameOnly;
        brandTarget.classList.add("brand-title");
        brandTarget.append(ueSpan, nameSpan);
      }
    }
  }

  const sectionLinks = document.querySelectorAll(".ux-section-nav a[href^='#']");
  const sections = Array.from(sectionLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sectionLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          sectionLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll(".ux-faq-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".ux-faq-item");
      if (!item) return;
      const panel = item.querySelector(".ux-faq-panel");
      const willOpen = !item.classList.contains("open");
      item.classList.toggle("open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (panel) panel.hidden = !willOpen;
    });
  });

  let toTopButton = document.querySelector(".ux-back-top");
  if (!toTopButton) {
    toTopButton = document.createElement("button");
    toTopButton.className = "ux-back-top";
    toTopButton.type = "button";
    toTopButton.setAttribute("aria-label", "Volver arriba");
    toTopButton.textContent = "↑";
    document.body.appendChild(toTopButton);
  }

  const toggleTopButton = () => {
    toTopButton.classList.toggle("visible", window.scrollY > 320);
  };

  window.addEventListener("scroll", toggleTopButton, { passive: true });
  toggleTopButton();

  toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
