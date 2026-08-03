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
