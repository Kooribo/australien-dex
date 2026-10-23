// Offline-Modus: speichert die ganze Seite samt Fotos auf dem Handy.
// Nach Änderungen an Dateien VERSION erhöhen, damit Handys die neue Fassung laden.
const VERSION = "ostdex-v1";
const FILES = [
  "./",
  "index.html",
  "data.js",
  "credits.js",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "img/adlerrochen.jpg",
  "img/agakroete.jpg",
  "img/allfarblori.jpg",
  "img/ameisenigel.jpg",
  "img/bartagame.jpg",
  "img/bennettwallaby.jpg",
  "img/blauring.jpg",
  "img/blauzunge.jpg",
  "img/bluebottle.jpg",
  "img/braunschlange.jpg",
  "img/buckelwal.jpg",
  "img/bulldoggenameise.jpg",
  "img/bullenhai.jpg",
  "img/buntwaran.jpg",
  "img/buschhuhn.jpg",
  "img/clownfisch.jpg",
  "img/dingo.jpg",
  "img/dornenkrone.jpg",
  "img/dugong.jpg",
  "img/emu.jpg",
  "img/eulenschwalm.jpg",
  "img/faecherschwanz.jpg",
  "img/flinkwallaby.jpg",
  "img/floetenvogel.jpg",
  "img/flughund.jpg",
  "img/fuchskusu.jpg",
  "img/gelbhaubenkakadu.jpg",
  "img/gleitbeutler.jpg",
  "img/gluehwuermchen.jpg",
  "img/graueskaenguru.jpg",
  "img/huntsman.jpg",
  "img/ibis.jpg",
  "img/irukandji.svg",
  "img/kasuar.jpg",
  "img/kegelschnecke.jpg",
  "img/keilschwanzadler.jpg",
  "img/koala.jpg",
  "img/koenigssittich.jpg",
  "img/kookaburra.jpg",
  "img/kragenechse.jpg",
  "img/laubenvogel.jpg",
  "img/laubfrosch.jpg",
  "img/leierschwanz.jpg",
  "img/leistenkrokodil.jpg",
  "img/maskenkiebitz.jpg",
  "img/napoleon.jpg",
  "img/papageifisch.jpg",
  "img/pelikan.jpg",
  "img/pennantsittich.jpg",
  "img/rabenkakadu.jpg",
  "img/rautenpython.jpg",
  "img/redback.jpg",
  "img/riesenmuraene.jpg",
  "img/riesenmuschel.jpg",
  "img/rosakakadu.jpg",
  "img/rotbauchschwarzotter.jpg",
  "img/rotfeuerfisch.jpg",
  "img/rotkaenguru.jpg",
  "img/schnabeltier.jpg",
  "img/schwarzspitzenhai.jpg",
  "img/schwatzvogel.jpg",
  "img/seeadler.jpg",
  "img/seebaer.jpg",
  "img/seestern.jpg",
  "img/seidenspinne.jpg",
  "img/silbermoewe.jpg",
  "img/staffelschwanz.jpg",
  "img/steinfisch.jpg",
  "img/sumpfwallaby.jpg",
  "img/suppenschildkroete.jpg",
  "img/taipan.jpg",
  "img/tannenzapfenechse.jpg",
  "img/tigerotter.jpg",
  "img/trauerschwan.jpg",
  "img/trichternetzspinne.jpg",
  "img/triel.jpg",
  "img/tuemmler.jpg",
  "img/ulysses.jpg",
  "img/wasseragame.jpg",
  "img/weberameise.jpg",
  "img/weisserhai.jpg",
  "img/weissspitzenhai.jpg",
  "img/westgraueskaenguru.jpg",
  "img/wombat.jpg",
  "img/wuerfelqualle.jpg",
  "img/zebrahai.jpg",
  "img/zecke.jpg",
  "img/zikade.jpg",
  "img/zwergpinguin.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "ostdex-fonts").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Schriften von Google: beim ersten Laden merken, danach aus dem Speicher
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    // Zeitlimit, damit schlechter Empfang die Seite nicht blockiert (dann Ersatzschrift)
    const timeout = new Promise((_, no) => setTimeout(() => no(new Error("timeout")), 3000));
    e.respondWith(caches.open("ostdex-fonts").then(c => c.match(req).then(hit => hit ||
      Promise.race([fetch(req), timeout]).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== location.origin) return;

  // Eigene Dateien: zuerst aus dem Speicher, sonst aus dem Netz
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
      return res;
    }))
  );
});
