// de:Deutsche Übersetzung — Werte natürlich übersetzt, Schlüsselform identisch mit en.
// Vertrag: Schlüsselform muss mit en exakt übereinstimmen (tests/seo.test.ts tiefvergleichend), Werte müssen de sein.
const de = {
  brand: "FocusDash",
  tagline: "Jede Zeitmessung läuft in Ihrem Browser.",
  metaDesc: "Kostenlose Online-Timer: Pomodoro, Flowtime, Stoppuhr mit Runden und mehrere benannte Countdowns. Alles läuft in Ihrem Browser — die Sekunden bleiben auf Ihrem Gerät.",

  nav: {
    tools: "Alle Tools",
    categories: "Kategorien",
    about: "Über uns",
    menu: "Menü",
    language: "Sprache",
  },

  home: {
    heroTitle: "Timer, die Ihren Fokus respektieren – nicht Ihre Aufmerksamkeitsspanne",
    heroSub: "FocusDash ist eine Sammlung von Fokus-Timern: Pomodoro-Zyklen, Flowtime, Stoppuhr mit Runden und parallele Countdowns. Alles im Browser — schnell, kostenlos, ohne Anmeldung, nichts wird gesendet.",
    browseAll: "Alle Tools ansehen",
    categoriesTitle: "Kategorien",
    featuredTitle: "Beliebte Tools",
    trustLocal: "Ihre Sitzungen bleiben auf Ihrem Gerät",
    trustFree: "Kostenlos, ohne Konto",
    trustFast: "Sofort, funktioniert offline",
    rotating: [
      "Ein kompletter 25/5-Pomodoro-Durchgang mit Klingelzeichen — vier Fokusblöcke, eine lange Pause",
      "Flowtime: arbeiten bis zum natürlichen Stopp, eine Minute Pause je fünf Fokus-Minuten",
      "Einen langen Lauf in Runden aufteilen — auf die Hundertstelsekunde genau",
      "Tee um 3:00, Code-Review um 15:00 — Countdowns parallel laufen lassen",
    ],
    statsLabels: { tools: "Tools", languages: "Sprachen", uploads: "Uploads", accounts: "Konten" },
    eyebrow: "Für immer kostenlos",
    heroCtaSecondary: "So funktioniert es",
    statsTools: "{n} Tools",
    statsLanguages: "{n} Sprachen",
    statsUploads: "0 Uploads",
    statsAccounts: "0 Konten",
    categoriesSub: "Vier Timer, alle auf Ihrem Gerät.",
    popularSub: "Die Tools, die am häufigsten geöffnet werden.",
    privacyTitle: "Die Sekunden verlassen Ihr Gerät nie.",
    privacySub:
      "Es gibt keinen Upload-Schritt. Die Tools sind JavaScript, das in Ihrem Browser läuft — das ist kein Versprechen in einer Datenschutzerklärung, sondern die Art, wie sie gebaut sind.",
    privacyPoint1T: "Lokale Verarbeitung",
    privacyPoint1D: "Die Zeitmessung wird während des Seitenlaufs im Speicher mit der Uhr Ihres eigenen Geräts berechnet. Nichts wird übertragen, nirgendwo.",
    privacyPoint2T: "Keine Konten",
    privacyPoint2D: "Keine Anmeldung, keine E-Mail, kein gespeicherter Verlauf. Tool öffnen und loslegen.",
    privacyPoint3T: "Ehrlich von Grund auf",
    privacyPoint3D:
      "Wenn etwas im Browser wirklich nicht geht, sagen wir das — statt es so zu tun, als würde es funktionieren.",
    privacyLink: "Die vollständigen Datenschutzhinweise lesen",
    endTitle: "Wählen Sie ein Tool. Es funktioniert einfach.",
    endSub: "Fünfzehn Sprachen, null Übertragungen, nichts zu installieren.",
  },

  tools: {
    title: "Alle Tools",
    subtitle: "Durchsuchen Sie {count} kostenlose Browser-Tools. Kein Upload, keine Anmeldung.",
    filterPlaceholder: "Tools suchen…",
    count: "{count} Tools",
    empty: "Keine Tools passen zu „{query}“.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF-Dateien zusammenfügen, teilen, konvertieren und bearbeiten — ohne sie irgendwo hochzuladen." },
    image: { name: "Bilder", desc: "Bilder direkt im Browser komprimieren, skalieren, zuschneiden und konvertieren." },
    text: { name: "Text", desc: "Text zählen, bereinigen, sortieren und umwandeln — sofort bei jeder Eingabe." },
    developer: { name: "Entwickler", desc: "Formatierer, Encoder, Decoder und Generatoren für die tägliche Entwicklerarbeit." },
    seo: { name: "SEO", desc: "Meta-Tags, Schema-Markup, SERP-Vorschau und weitere On-Page-SEO-Helfer." },
    security: { name: "Sicherheit", desc: "Passwörter, Hashes und Lookups — auf Ihrem Gerät erzeugt und geprüft." },
    utility: { name: "Timer", desc: "Pomodoro, Flowtime, Stoppuhr und Mehrfach-Countdowns für konzentriertes Arbeiten und alltägliche Fristen." },
  },

  tool: {
    howTo: "So verwenden Sie es",
    faq: "Häufige Fragen",
    related: "Verwandte Tools",
    privacyNote:
      "Dieses Tool läuft vollständig in Ihrem Browser. Ihre Daten verlassen Ihr Gerät nie — sie werden auf keinen Server hochgeladen.",
    inCategory: "Mehr in {category}",
    backToCategory: "Alle {category}-Tools",
  },

  common: {
    openTool: "Werkzeug öffnen",
    copy: "Kopieren",
    copied: "Kopiert",
    download: "Herunterladen",
    reset: "Zurücksetzen",
    swap: "Tauschen",
    clear: "Leeren",
    error: "Etwas ist schiefgelaufen. Prüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
    input: "Eingabe",
    output: "Ergebnis",
    settings: "Optionen",
    dropFiles: "Dateien hierher ziehen oder klicken zum Auswählen",
    dropFile: "Datei hierher ziehen oder klicken zum Auswählen",
    processing: "Verarbeitung…",
    fileSize: "Größe",
    sample: "Beispiel ausprobieren",
    uppercase: "GROSSBUCHSTABEN",
  },

  unit: {
    from: "Von",
    to: "Nach",
    amount: "Menge",
    result: "Ergebnis",
    common: "Häufige Umrechnungen",
    formula: "Formel",
    allUnits: "Alle Einheiten",
  },

  text: {
    stats: {
      words: "Wörter",
      characters: "Zeichen",
      charsNoSpaces: "Ohne Leerzeichen",
      sentences: "Sätze",
      paragraphs: "Absätze",
      lines: "Zeilen",
      readingTime: "Lesezeit",
      readingMinutes: "{n} Min. Lesezeit",
    },
  },

  footer: {
    line: "Fokus- und Timer-Tools. Nichts, was Sie hier messen, verlässt Ihr Gerät.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    about: "Über uns",
    badges: "Badges",
    language: "Sprache",
  },

  badge: {
    title: "FocusDash-Badges",
    desc: "Setzen Sie ein FocusDash-Badge auf Ihre Website, Ihr README oder Ihre Doku. Es verlinkt hierher und zeigt, dass die Timer dahinter vollständig im Browser laufen.",
    voluntary: "Das Einbetten ist völlig freiwillig — nehmen Sie ein Badge, wenn Ihnen das Projekt gefällt. Keine Erlaubnis nötig.",
    md: "Markdown (README)",
    html: "HTML (Website)",
    thanks: "Danke für die Weiterempfehlung — jede Einbettung hilft mehr Menschen, Tools zu entdecken, die ihre Dateien respektieren.",
  },

    embed: {
    title: "Dieses Tool einbetten",
    desc: "Binden Sie dieses Tool mit einer Zeile in Ihre Website ein — es läuft im Browser des Besuchers.",
  },

    mcp: {
    title: "MCP-Server — KI-zugängliche Tools",
    desc1: "FocusDash bringt einen MCP-Server (Model Context Protocol) mit: KI-Assistenten wie Claude oder Cursor führen dieselbe Timer-Logik aus wie auf dieser Website — dieselben getesteten Funktionen, keine Neuimplementierung.",
    desc2: "Die Tools nutzen die reinen Funktionen der Website selbst: Pomodoro-Phasenpläne und Zeitformatierung. Die Ausführung erfolgt über npx auf dem Rechner des KI-Clients — nichts wird an unsere Server gesendet.",
    toolsTitle: "Ausführbare Tools ({n})",
    requiresNode: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
    privacy: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
  },

    notFound: {
    title: "Seite nicht gefunden",
    body: "Das gesuchte Tool existiert nicht. Sehen Sie sich stattdessen alle Tools an.",
    home: "Zur Startseite",
  },
};

export default de;
