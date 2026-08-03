<div align="center">

<img src="bilder/cover-project-one-atlantis.jpg" alt="Cover „Project ONE: Atlantis“" width="220">

# Konrad Eichhorn — Autorenseite

**Die offizielle Website zum Debütroman *Project ONE: Atlantis***

[**→ Zur Website**](https://keichhorn.github.io/author/)

![Statisches HTML](https://img.shields.io/badge/Stack-statisches%20HTML-0b1016?style=flat-square)
![Kein Tracking](https://img.shields.io/badge/Tracking-keins-4fd1c5?style=flat-square)
![Alle Rechte vorbehalten](https://img.shields.io/badge/Lizenz-alle%20Rechte%20vorbehalten-d9b45b?style=flat-square)

</div>

---

## Worum es geht

Dieses Repository enthält ausschließlich die Website — eine handgeschriebene, statische Seite
ohne Build-Schritt, ohne Framework und ohne externe Ressourcen. Sie wird über GitHub Pages
unter <https://keichhorn.github.io/author/> ausgeliefert.

> [!IMPORTANT]
> Das Manuskript gehört **nicht** hierher. Dieses Repository ist öffentlich — inklusive der
> vollständigen Git-Historie. Einmal committete Dateien bleiben auch nach dem Löschen im
> Verlauf auffindbar.

## Aufbau

```
.
├── index.html          Startseite: Meine Bücher, Über mich, Kontakt
├── impressum.html      Anbieterkennzeichnung nach § 5 DDG
├── datenschutz.html    Datenschutzerklärung (DSGVO)
├── 404.html            Fehlerseite
├── assets/
│   ├── style.css       gesamtes Design, ein einziges Stylesheet
│   └── script.js       weiches Scrollen zu Ankerzielen (sonst kein JavaScript)
└── bilder/
    └── cover-project-one-atlantis.jpg
```

## Bearbeiten und veröffentlichen

```bash
git clone https://github.com/keichhorn/author.git
cd author
# Dateien ändern …
git add .
git commit -m "Website aktualisiert"
git push
```

Nach dem Push baut GitHub Pages die Seite automatisch neu; nach ein bis zwei Minuten ist die
Änderung online. Zum lokalen Ansehen genügt ein Doppelklick auf `index.html` — für ein
realistischeres Bild:

```bash
python -m http.server 8000
# http://localhost:8000 im Browser öffnen
```

## Einmalige Einrichtung von GitHub Pages

1. Repository → **Settings** → **Pages**
2. *Source*: **Deploy from a branch**
3. *Branch*: `main`, Ordner `/ (root)` → **Save**

Nach ein bis zwei Minuten läuft die Seite. Pages ist im Free-Tarif nur für öffentliche
Repositories verfügbar.

## Offene Punkte

- [ ] **Impressum:** echte c/o-Anschrift eintragen (aktuell Platzhalter, in [impressum.html](impressum.html) und [datenschutz.html](datenschutz.html) mit `class="todo"` markiert)
- [ ] **Amazon-Link:** in [index.html](index.html) beim gelben Button `aria-disabled` entfernen und die echte Produkt-URL eintragen (der fertige Tag steht als Kommentar daneben)
- [ ] **Band 2:** Titel, Klappentext und Cover ergänzen, sobald vorhanden — der Platzhalter-Block ist angelegt
- [ ] **Stand** der Datenschutzerklärung auf Monat/Jahr der Veröffentlichung setzen
- [ ] optional: eigene Domain hinterlegen (`CNAME`-Datei plus zwei DNS-Records)

> [!WARNING]
> Solange im Impressum Platzhalter stehen, sollte die Seite nicht beworben werden.
> Eine unvollständige Anbieterkennzeichnung ist abmahnfähig.

## Technische Entscheidungen

| Entscheidung | Grund |
|---|---|
| keine Frameworks, kein Build | eine Datei ändern, pushen, fertig — nichts veraltet |
| Systemschriften statt Google Fonts | keine Datenübertragung an Dritte, kein DSGVO-Risiko |
| relative Pfade (`bilder/…`) | die Seite liegt im Unterpfad `/author/`, absolute Pfade würden ins Leere zeigen |
| Farbwelt aus dem Cover | Gold, Türkis und Nachtblau verbinden Website und Buch |
| Inline-SVG als Favicon | ein Netzwerkaufruf weniger, keine zusätzliche Datei |

## Lizenz

**Keine.** Alle Rechte vorbehalten. © 2026 Konrad Eichhorn.

Ohne Lizenzdatei gilt das volle Urheberrecht: Texte, Bildmaterial und Quelltext dieses
Repositories dürfen nicht kopiert, verändert oder weiterverwendet werden. Dass GitHub das
Ansehen und Forken öffentlicher Repositories technisch erlaubt, begründet keinerlei
Nutzungsrecht.
