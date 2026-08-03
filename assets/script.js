/* Weiches Scrollen zu Ankerzielen.
 *
 * Das CSS kennt zwar scroll-behavior: smooth, das greift aber nicht überall
 * zuverlässig (Systemeinstellung „Animationen reduzieren", ältere Engines,
 * manche eingebettete Vorschaufenster). Darum hier eine eigene Animation:
 * einheitliches Verhalten, dazu ein Ausgleich für die sticky Kopfzeile,
 * damit die Überschrift nicht darunter verschwindet.
 *
 * Kein Framework, keine externen Aufrufe — reines lokales Skript.
 */
(function () {
  "use strict";

  /* ============================================================
   * AMAZON-ADRESSEN — die einzigen Stellen, die geändert werden müssen.
   *
   * Solange hier "" steht, bleiben die Verweise stumm: der Buchlink
   * zeigt „folgt“ an, der Verweis aufs Autorenprofil bleibt ganz
   * ausgeblendet. Sobald eine Adresse eingetragen ist, wird daraus
   * überall ein echter Link.
   *
   *   var AMAZON_URL        = "https://www.amazon.de/dp/XXXXXXXXXX";
   *   var AMAZON_AUTHOR_URL = "https://www.amazon.de/author/XXXXXXXX";
   * ============================================================ */
  var AMAZON_URL = "";
  var AMAZON_AUTHOR_URL = "";

  function verlinke(attribut, url) {
    if (!url) return;

    var ziele = document.querySelectorAll("[" + attribut + "]");
    for (var i = 0; i < ziele.length; i++) {
      var el = ziele[i];
      var text = el.getAttribute(attribut);

      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.removeAttribute("aria-disabled");
      el.removeAttribute("title");
      el.classList.remove("pending");
      if (text) el.textContent = text;
    }
  }

  function aktiviereAmazonLinks() {
    verlinke("data-amazon", AMAZON_URL);
    verlinke("data-amazon-author", AMAZON_AUTHOR_URL);

    // Verweise aufs Autorenprofil erscheinen erst mit hinterlegter Adresse.
    if (AMAZON_AUTHOR_URL) {
      var eintraege = document.querySelectorAll("[data-amazon-author-item]");
      for (var j = 0; j < eintraege.length; j++) {
        eintraege[j].removeAttribute("hidden");
      }
    }

    // Der Hinweis „Erscheint voraussichtlich 2026“ neben dem Button
    // ergibt mit echtem Kauflink keinen Sinn mehr.
    if (AMAZON_URL) {
      var hinweis = document.querySelector(".hero .hint");
      if (hinweis) hinweis.remove();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", aktiviereAmazonLinks);
  } else {
    aktiviereAmazonLinks();
  }

  var root = document.documentElement;

  // Eigene Animation und natives Smooth-Scrolling würden sich gegenseitig
  // glätten und dadurch ruckeln. Ab hier übernimmt das Skript.
  root.style.scrollBehavior = "auto";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURATION = reduced ? 320 : 780;
  var EXTRA_GAP = 12; // Luft zwischen Kopfzeile und Ziel

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function headerHeight() {
    var head = document.querySelector(".site-head");
    return head ? head.getBoundingClientRect().height : 0;
  }

  function scrollToY(targetY) {
    var startY = window.pageYOffset;
    var maxY = document.body.scrollHeight - window.innerHeight;
    var endY = Math.max(0, Math.min(targetY, maxY));
    var distance = endY - startY;

    if (Math.abs(distance) < 2) return;

    var startTime = null;

    function step(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / DURATION, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  document.addEventListener("click", function (event) {
    // Modifiziertes Klicken (neuer Tab, Mittelklick) unangetastet lassen
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    var target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();

    var top = target.getBoundingClientRect().top + window.pageYOffset;
    scrollToY(top - headerHeight() - EXTRA_GAP);

    // Adresszeile mitziehen, ohne den Sprung auszulösen
    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", hash);
    }

    // Tastaturfokus nachführen, sonst springt Tab wieder an den Seitenanfang
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
})();
