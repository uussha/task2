/**
 * Internship Task Document — minimal client-side enhancement
 * Built with Vite + Nunjucks
 */
(function () {
  "use strict";

  const badge = document.createElement("div");
  badge.className = "build-badge";
  badge.innerHTML = "Built with <strong>Nunjucks</strong> + <strong>Vite</strong>";
  document.body.appendChild(badge);

  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
    if (!link.hasAttribute("target")) {
      link.setAttribute("target", "_blank");
    }
  });
})();
