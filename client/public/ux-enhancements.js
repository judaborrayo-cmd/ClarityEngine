/* -----------------------------------------------------------------------------
  UX Enhancements (image-free, progressive)
  - Refine Solutions Tabs: distinct backgrounds + inline SVG icons + ARIA
  - Hero: soften two testimonials so primary CTA dominates
  - No external deps; safe if elements missing
----------------------------------------------------------------------------- */

(function () {
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    enhanceRefineSolutionsTabs();
    deEmphasizeHeroTestimonials();
  }

  /* -------------------- 1) Refine Solutions Tabs --------------------------- */

  function enhanceRefineSolutionsTabs() {
    const tabsRoot   = document.querySelector("#solutions-tabs");
    const panelsRoot = document.querySelector("#solutions-panels");
    if (!tabsRoot || !panelsRoot) return;

    // Low-opacity brand palette (tweak if needed)
    const palette = {
      revenue:    "rgba(52, 199, 89, 0.10)",   // green
      growth:     "rgba(136, 84, 255, 0.10)",  // purple
      conversion: "rgba(0, 122, 255, 0.10)"    // blue
    };

    // Minimal inline SVGs (no network)
    const icons = {
      revenue: `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12l5 5L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
      growth: `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
      conversion: `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7H4l6 7v5l4-2v-3l6-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/></svg>`
    };

    const sectionWrapper =
      panelsRoot.closest('[data-section="refine-solutions"]') || panelsRoot;

    const tabButtons = Array.from(tabsRoot.querySelectorAll("[data-tab]"));
    const panels     = Array.from(panelsRoot.querySelectorAll("[data-panel]"));

    // Inject icons and ARIA
    tabButtons.forEach((btn) => {
      const key = norm(btn.getAttribute("data-tab"));
      if (!key) return;

      if (!btn.__iconInjected) {
        const wrap = document.createElement("span");
        wrap.className = "inline-flex items-center gap-2";
        wrap.innerHTML = `${icons[key] || ""}<span class="tab-label">${btn.textContent.trim()}</span>`;
        btn.textContent = "";
        btn.appendChild(wrap);
        btn.__iconInjected = true;
      }
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", btn.classList.contains("active") ? "true" : "false");
    });

    panels.forEach((p) => p.setAttribute("role", "tabpanel"));

    // Initial state
    const initial = tabButtons.find((b) => b.classList.contains("active")) || tabButtons[0];
    if (initial) {
      const key = initial.getAttribute("data-tab");
      setActive(key);
      applyVisuals(key);
    }

    // Events
    tabsRoot.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-tab]");
      if (!btn) return;
      e.preventDefault();
      const key = btn.getAttribute("data-tab");
      setActive(key);
      applyVisuals(key);
    });

    tabsRoot.addEventListener("keydown", (e) => {
      const currentIndex = tabButtons.findIndex(b => b.classList.contains("active"));
      if (currentIndex < 0) return;
      let nextIndex = currentIndex;

      if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabButtons.length;
      if (e.key === "ArrowLeft")  nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;

      if (nextIndex !== currentIndex) {
        const key = tabButtons[nextIndex].getAttribute("data-tab");
        tabButtons[nextIndex].focus();
        setActive(key);
        applyVisuals(key);
        e.preventDefault();
      }
    });

    function setActive(keyRaw) {
      tabButtons.forEach((b) => {
        const isActive = b.getAttribute("data-tab") === keyRaw;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach((p) => {
        const isMatch = p.getAttribute("data-panel") === keyRaw;
        p.hidden = !isMatch;
      });
    }

    function applyVisuals(keyRaw) {
      const key = norm(keyRaw);
      const color = palette[key] || "transparent";
      sectionWrapper.style.transition = "background-color 180ms ease";
      sectionWrapper.style.backgroundColor = color;

      tabButtons.forEach((b) => {
        const active = b.getAttribute("data-tab") === keyRaw;
        b.style.transition = "box-shadow 150ms ease, background-color 150ms ease";
        b.style.boxShadow = active ? "0 0 0 2px rgba(0,0,0,0.06) inset" : "none";
        b.style.backgroundColor = active ? "rgba(0,0,0,0.02)" : "transparent";
      });
    }

    function norm(v) {
      if (!v) return null;
      const s = String(v).toLowerCase().trim();
      if (s.startsWith("rev")) return "revenue";
      if (s.startsWith("gro")) return "growth";
      if (s.startsWith("con")) return "conversion";
      return s;
    }
  }

  /* -------------------- 2) Hero: de-emphasize two testimonials ------------- */

  function deEmphasizeHeroTestimonials() {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const heroTestimonials = Array.from(
      hero.querySelectorAll('[data-testimonial="hero"]')
    );
    if (!heroTestimonials.length) return;

    heroTestimonials.forEach((card) => {
      card.style.transition   = "all 180ms ease";
      card.style.background   = "transparent";
      card.style.border       = "1px solid rgba(0,0,0,0.08)";
      card.style.boxShadow    = "none";
      card.style.padding      = "12px 14px";
      card.style.borderRadius = "12px";
      card.style.opacity      = "0.92";

      const h = card.querySelector("h4, h5, strong");
      const p = card.querySelector("p");
      if (h) h.style.fontSize = "0.95rem";
      if (p) p.style.fontSize = "0.92rem";
    });

    const cta = hero.querySelector('[data-cta="primary"]');
    if (cta) {
      cta.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      cta.style.transform = "translateZ(0)";
    }
  }
})();