const buildSharedHeader = () => {
  const header = document.querySelector("header");
  if (!header) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = [
    { href: "index.html", label: "Inicio" },
    { href: "que_aprenderas.html", label: "Que aprenderas" },
    { href: "competencias_tecnicas.html", label: "Competencias tecnicas" },
    { href: "salida_profesional.html", label: "Salida profesional" },
    { href: "plan_de_estudio.html", label: "Plan de estudio" },
  ];

  const navLinks = navItems
    .map(({ href, label }) => {
      const activeAttr = href === currentPage ? ' aria-current="page"' : "";
      return `<a href="${href}"${activeAttr}>${label}</a>`;
    })
    .join("");

  header.innerHTML = `
    <div class="brand">
      <img src="images/logo 2.svg" alt="Logo U.E 17 de Septiembre" class="logo">
      <h1><a href="https://clarizaespinoza.wordpress.com" target="_blank">U.E 17 de Septiembre</a></h1>
    </div>
    <button id="menu-btn" type="button" aria-label="Abrir menu">&#9776;</button>
    <nav id="nav-menu">${navLinks}</nav>
  `;
};

const buildSharedFooter = () => {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer">
      <p class="footer-copyright">
        &copy; 2025 - Bachillerato Tecnico en Informatica<br>
        Unidad Educativa "17 de Septiembre" - Modalidad Presencial
      </p>
      <p class="footer-authors">
        Proyecto de grado desarrollado por:<br>
        <strong>Andy Landi</strong>, <strong>Santiago Angulo</strong> y <strong>Jean Ibarra</strong>
      </p>
      <div class="footer-social">
        <a href="https://github.com/AnndyDevv/Proyecto-de-grado" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          Ver proyecto en GitHub
        </a>
      </div>
    </div>
  `;
};

const setupSharedMenu = () => {
  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav-menu");
  if (!btn || !nav) return;

  const checkWidth = () => {
    if (window.innerWidth < 700) {
      btn.style.display = "block";
      nav.classList.remove("active");
      nav.style.display = "";
    } else {
      btn.style.display = "none";
      nav.classList.remove("active");
      nav.style.display = "flex";
    }
  };

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  window.addEventListener("resize", checkWidth);
  checkWidth();
};

document.addEventListener("DOMContentLoaded", () => {
  buildSharedHeader();
  buildSharedFooter();
  setupSharedMenu();

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
