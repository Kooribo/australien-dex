// Ostküsten-Dex – Tierdaten
// cm = typische Größe ausgewachsener Tiere (Körperlänge, Höhe oder Spannweite) – danach wird sortiert und nummeriert.
// gefahr: 1 harmlos · 2 gering · 3 mittel · 4 hoch · 5 lebensgefährlich
// chance: wie wahrscheinlich ihr das Tier auf eurer Route seht (häufig · mittel · selten)

const STOPS = [
  { k: "mel",    name: "Melbourne & Phillip Island", kurz: "Melbourne",  datum: "25.10.–29.10." },
  { k: "mungo",  name: "Mungo-Nationalpark (Outback)", kurz: "Mungo",    datum: "29.10.–30.10." },
  { k: "can",    name: "Griffith & Canberra",        kurz: "Canberra",   datum: "30.10.–2.11." },
  { k: "syd",    name: "Sydney & Blue Mountains",    kurz: "Sydney",     datum: "2.11.–6.11." },
  { k: "byron",  name: "Byron Bay",                  kurz: "Byron Bay",  datum: "6.11.–9.11." },
  { k: "bne",    name: "Brisbane",                   kurz: "Brisbane",   datum: "9.11.–11.11." },
  { k: "mackay", name: "Rockhampton, Mackay & Eungella", kurz: "Mackay", datum: "11.11.–13.11." },
  { k: "whit",   name: "Airlie Beach & Whitsundays", kurz: "Whitsundays", datum: "13.11.–15.11." },
  { k: "cns",    name: "Cairns, Daintree & Riff",    kurz: "Cairns",     datum: "15.11.–19.11." },
];

const ALLE = STOPS.map(s => s.k);
const KUESTE = ["mel", "syd", "byron", "bne", "mackay", "whit", "cns"];

const TIERE = [
  { k: "buckelwal", de: "Buckelwal", en: "Humpback Whale", la: "Megaptera novaeangliae", typ: "wasser", gruppe: "Säugetier",
    cm: 1500, groesse: "12–16 m", gewicht: "25–30 t", essen: "Krill und kleine Schwarmfische, die er mit seinen Barten aus dem Wasser filtert",
    fakt: "Im Oktober und November ziehen die Buckelwale mit ihren Kälbern zurück in die Antarktis, direkt an Byron Bay vorbei. Die Männchen singen bis zu 20 Minuten lange Lieder.",
    gefahr: 1, tipp: "Harmlos. Boote müssen 100 m Abstand halten.", orte: ["syd", "byron"], chance: "mittel" },

  { k: "weisserhai", de: "Weißer Hai", en: "Great White Shark", la: "Carcharodon carcharias", typ: "wasser", gruppe: "Fisch",
    cm: 450, groesse: "4–6 m", gewicht: "0,7–1,1 t", essen: "Robben, große Fische, Rochen, Delfine",
    fakt: "Spürt mit Sinnesorganen an der Schnauze die elektrischen Felder seiner Beute und erreicht kurzzeitig über 50 km/h.",
    gefahr: 5, tipp: "Begegnungen sind selten, aber er verursacht die meisten tödlichen Haiunfälle Australiens. Nur an bewachten Stränden zwischen den rot-gelben Flaggen schwimmen, nicht in der Dämmerung und nicht in trübem Wasser.",
    orte: ["mel", "syd", "byron"], chance: "selten" },

  { k: "leistenkrokodil", de: "Leistenkrokodil", en: "Saltwater Crocodile („Saltie“)", la: "Crocodylus porosus", typ: "wasser", gruppe: "Reptil",
    cm: 500, groesse: "Männchen 4–6 m, Weibchen ca. 3 m", gewicht: "400–1000 kg", essen: "Fische, Vögel, Wallabys, Wildschweine – alles, was ans Ufer kommt",
    fakt: "Das größte lebende Reptil der Welt mit dem stärksten gemessenen Biss aller Tiere. Es schwimmt auch weit hinaus ins Meer und zwischen Inseln hin und her.",
    gefahr: 5, tipp: "Lebensgefährlich. Warnschilder ernst nehmen, nie in Flüssen, Mangroven oder Lagunen baden, mehrere Meter Abstand vom Ufer halten, nicht direkt am Wasser zelten.",
    orte: ["mackay", "whit", "cns"], chance: "mittel" },

  { k: "dugong", de: "Dugong (Seekuh)", en: "Dugong", la: "Dugong dugon", typ: "wasser", gruppe: "Säugetier",
    cm: 300, groesse: "2,5–3 m", gewicht: "250–500 kg", essen: "Seegras, bis zu 40 kg am Tag",
    fakt: "Gilt als Ursprung der Meerjungfrauen-Sagen. Der nächste lebende Verwandte ist der Elefant.",
    gefahr: 1, tipp: "Harmlos und sehr scheu.", orte: ["bne", "whit", "cns"], chance: "selten" },

  { k: "bullenhai", de: "Bullenhai", en: "Bull Shark", la: "Carcharhinus leucas", typ: "wasser", gruppe: "Fisch",
    cm: 250, groesse: "2–3,5 m", gewicht: "90–230 kg", essen: "Fische, Rochen, kleinere Haie, Schildkröten",
    fakt: "Kann im Süßwasser leben. Im Brisbane River schwimmen Hunderte Bullenhaie, nach Hochwasser tauchen sie sogar in Kanälen und Golfplatz-Teichen auf.",
    gefahr: 5, tipp: "Nicht in Flüssen, Flussmündungen oder Kanälen schwimmen, schon gar nicht im Brisbane River.", orte: ["syd", "byron", "bne"], chance: "selten" },

  { k: "riesenmuraene", de: "Riesenmuräne", en: "Giant Moray", la: "Gymnothorax javanicus", typ: "wasser", gruppe: "Fisch",
    cm: 250, groesse: "bis 3 m", gewicht: "bis 30 kg", essen: "Fische, Kraken, Krebse",
    fakt: "Sie öffnet und schließt ständig das Maul. Das ist keine Drohung, so atmet sie. Manchmal jagt sie gemeinsam mit Zackenbarschen.",
    gefahr: 2, tipp: "Nie in Felsspalten greifen: Der Biss ist heftig und entzündet sich leicht.", orte: ["whit", "cns"], chance: "selten" },

  { k: "tuemmler", de: "Indopazifischer Großer Tümmler", en: "Indo-Pacific Bottlenose Dolphin", la: "Tursiops aduncus", typ: "wasser", gruppe: "Säugetier",
    cm: 250, groesse: "2–2,7 m", gewicht: "150–230 kg", essen: "Fische und Tintenfische",
    fakt: "In Byron Bay surfen Delfine oft direkt neben den Surfern in den Wellen. Jeder Delfin hat einen eigenen Pfiff, der wie ein Name funktioniert.",
    gefahr: 1, tipp: "Harmlos. Füttern ist in Australien verboten.", orte: ["syd", "byron", "bne", "whit"], chance: "häufig" },

  { k: "zebrahai", de: "Zebrahai", en: "Leopard Shark (Zebra Shark)", la: "Stegostoma tigrinum", typ: "wasser", gruppe: "Fisch",
    cm: 240, groesse: "bis 2,5 m", gewicht: "bis ca. 30 kg", essen: "Schnecken, Muscheln, Krebse, kleine Fische",
    fakt: "Jungtiere sind gestreift wie ein Zebra, Erwachsene gefleckt wie ein Leopard. Im Sommer liegen sie am Julian Rocks vor Byron Bay auf dem Sandboden – perfekt zum Schnorcheln.",
    gefahr: 1, tipp: "Harmlos und sehr ruhig.", orte: ["byron", "cns"], chance: "mittel" },

  { k: "rautenpython", de: "Rautenpython", en: "Carpet Python", la: "Morelia spilota", typ: "land", gruppe: "Reptil",
    cm: 240, groesse: "2–3 m, selten bis 4 m", gewicht: "bis 15 kg", essen: "Ratten, Possums, Vögel, Flughunde",
    fakt: "Wohnt oft auf Dachböden in Brisbane und wird dort als kostenloser Mäusejäger geschätzt. Mit Wärmesensoren an den Lippen findet sie Beute im Dunkeln.",
    gefahr: 1, tipp: "Ungiftig. Ein Biss tut weh, ist aber harmlos. In Ruhe lassen.", orte: ["syd", "byron", "bne", "mackay", "cns"], chance: "mittel" },

  { k: "seebaer", de: "Australischer Seebär", en: "Australian Fur Seal", la: "Arctocephalus pusillus", typ: "wasser", gruppe: "Säugetier",
    cm: 220, groesse: "1,5–2,3 m", gewicht: "Weibchen ca. 80 kg, Männchen bis 360 kg", essen: "Fische, Tintenfische, Kraken",
    fakt: "Auf den Seal Rocks vor Phillip Island lebt die größte Seebären-Kolonie Australiens mit bis zu 30.000 Tieren.",
    gefahr: 2, tipp: "An Land nicht nähern, die Bullen beißen. Mindestens 30 m Abstand.", orte: ["mel", "syd"], chance: "mittel" },

  { k: "napoleon", de: "Napoleon-Lippfisch", en: "Humphead Wrasse (Maori Wrasse)", la: "Cheilinus undulatus", typ: "wasser", gruppe: "Fisch",
    cm: 200, groesse: "bis 2 m", gewicht: "bis 190 kg", essen: "Seeigel, Muscheln, Krebse und sogar giftige Dornenkronen-Seesterne",
    fakt: "Sehr neugierig und schwimmt oft direkt auf Schnorchler zu. Viele Tiere wechseln mit etwa 9 Jahren vom Weibchen zum Männchen.",
    gefahr: 1, tipp: "Harmlos.", orte: ["whit", "cns"], chance: "mittel" },

  { k: "taipan", de: "Küstentaipan", en: "Coastal Taipan", la: "Oxyuranus scutellatus", typ: "land", gruppe: "Reptil",
    cm: 200, groesse: "1,5–2 m, bis 3 m", gewicht: "bis ca. 6 kg", essen: "Ratten und andere kleine Säugetiere",
    fakt: "Eine der giftigsten und schnellsten Schlangen der Welt. Vor dem Gegengift (1956) überlebte kaum jemand einen Biss.",
    gefahr: 5, tipp: "Bei jedem Schlangenbiss: Ruhe bewahren, Druckverband über die ganze Gliedmaße, ruhigstellen, Notruf 000. Die Wunde nicht auswaschen, das Krankenhaus bestimmt die Schlange am Gift.",
    orte: ["mackay", "whit", "cns"], chance: "selten" },

  { k: "adlerrochen", de: "Gefleckter Adlerrochen", en: "Spotted Eagle Ray", la: "Aetobatus ocellatus", typ: "wasser", gruppe: "Fisch",
    cm: 180, groesse: "Spannweite meist 1,5–2 m, bis 3 m", gewicht: "bis 200 kg", essen: "Muscheln, Schnecken und Krebse, deren Schalen er mit Zahnplatten knackt",
    fakt: "Fliegt mit seinen Flügeln regelrecht durchs Wasser und springt manchmal komplett aus dem Meer.",
    gefahr: 2, tipp: "Giftstachel am Schwanz. Nie bedrängen und im flachen Wasser mit schlurfenden Schritten gehen.", orte: ["byron", "bne", "whit", "cns"], chance: "mittel" },

  { k: "emu", de: "Emu", en: "Emu", la: "Dromaius novaehollandiae", typ: "land", gruppe: "Vogel",
    cm: 175, groesse: "1,5–1,9 m hoch", gewicht: "30–45 kg", essen: "Früchte, Samen, Blüten, Insekten",
    fakt: "Der zweitgrößte Vogel der Welt kann nicht fliegen, aber 50 km/h schnell rennen. Das Männchen brütet die Eier 8 Wochen lang aus und frisst in der Zeit fast nichts.",
    gefahr: 2, tipp: "Meist scheu. Nicht füttern, sie können kräftig treten.", orte: ["mungo", "can"], chance: "häufig" },

  { k: "pelikan", de: "Brillenpelikan", en: "Australian Pelican", la: "Pelecanus conspicillatus", typ: "luft", gruppe: "Vogel",
    cm: 170, groesse: "1,6–1,9 m, Spannweite bis 2,6 m", gewicht: "4–8 kg", essen: "Fische",
    fakt: "Hat den längsten Schnabel aller Vögel, bis zu 50 cm. Der Kehlsack fasst rund 13 Liter.",
    gefahr: 1, tipp: "Harmlos.", orte: KUESTE, chance: "häufig" },

  { k: "kasuar", de: "Helmkasuar", en: "Southern Cassowary", la: "Casuarius casuarius", typ: "land", gruppe: "Vogel",
    cm: 170, groesse: "1,5–1,8 m hoch", gewicht: "Weibchen bis 60 kg", essen: "Früchte von über 200 Pflanzenarten, Pilze, kleine Tiere",
    fakt: "Gilt als gefährlichster Vogel der Welt: Am Innenzeh sitzt eine 12 cm lange, dolchartige Kralle. Das Männchen brütet die Eier aus und zieht die Küken allein groß.",
    gefahr: 4, tipp: "Nie nähern oder füttern. Kommt einer auf euch zu: langsam zurückweichen, Rucksack oder Baum zwischen euch bringen, nicht wegrennen.",
    orte: ["cns"], chance: "mittel" },

  { k: "rotkaenguru", de: "Rotes Riesenkänguru", en: "Red Kangaroo", la: "Osphranter rufus", typ: "land", gruppe: "Säugetier",
    cm: 160, groesse: "Körper bis 1,6 m + 1 m Schwanz", gewicht: "Männchen bis 85 kg", essen: "Gräser und Kräuter",
    fakt: "Das größte Beuteltier der Welt. Springt bis zu 9 m weit, erreicht 60 km/h und kann kaum rückwärts laufen.",
    gefahr: 2, tipp: "Große Männchen treten und kratzen, wenn man sie bedrängt. Die echte Gefahr ist der Wildwechsel: Im Outback in der Dämmerung und nachts nicht fahren!",
    orte: ["mungo"], chance: "häufig" },

  { k: "schwarzspitzenhai", de: "Schwarzspitzen-Riffhai", en: "Blacktip Reef Shark", la: "Carcharhinus melanopterus", typ: "wasser", gruppe: "Fisch",
    cm: 155, groesse: "1–1,6 m", gewicht: "bis 14 kg", essen: "Kleine Fische, Tintenfische",
    fakt: "Patrouilliert oft in knietiefem Wasser an Lagunen. Dann ragt die schwarze Spitze der Rückenflosse aus dem Wasser.",
    gefahr: 2, tipp: "Meist scheu. Kann im Flachwasser zwicken, wenn man versehentlich auf ihn tritt.", orte: ["whit", "cns"], chance: "häufig" },

  { k: "weissspitzenhai", de: "Weißspitzen-Riffhai", en: "Whitetip Reef Shark", la: "Triaenodon obesus", typ: "wasser", gruppe: "Fisch",
    cm: 160, groesse: "1,2–1,6 m", gewicht: "bis 18 kg", essen: "Riff-Fische, Kraken, Krebse – jagt nachts in Spalten",
    fakt: "Liegt tagsüber oft regungslos in Höhlen. Anders als viele Haie kann er dabei Wasser aktiv über die Kiemen pumpen.",
    gefahr: 2, tipp: "Scheu. Harmlos, solange man ihn in Ruhe lässt.", orte: ["whit", "cns"], chance: "häufig" },

  { k: "graueskaenguru", de: "Östliches Graues Riesenkänguru", en: "Eastern Grey Kangaroo", la: "Macropus giganteus", typ: "land", gruppe: "Säugetier",
    cm: 150, groesse: "Körper bis 1,5 m + 1 m Schwanz", gewicht: "Männchen bis 66 kg", essen: "Gräser",
    fakt: "In Canberra grasen sie abends mitten in der Stadt auf Rasenflächen. Am Cape Hillsborough hüpfen sie bei Sonnenaufgang über den Strand.",
    gefahr: 2, tipp: "Große Männchen nicht bedrängen. Auf der Straße in der Dämmerung aufpassen.", orte: ["mel", "can", "syd", "mackay"], chance: "häufig" },

  { k: "braunschlange", de: "Östliche Braunschlange", en: "Eastern Brown Snake", la: "Pseudonaja textilis", typ: "land", gruppe: "Reptil",
    cm: 150, groesse: "1,5–2 m", gewicht: "bis ca. 1,5 kg", essen: "Mäuse, Ratten, Eidechsen, Frösche",
    fakt: "Die zweitgiftigste Landschlange der Welt und für die meisten Schlangenbiss-Todesfälle Australiens verantwortlich. Schnell, nervös und auch am Stadtrand unterwegs.",
    gefahr: 5, tipp: "Abstand halten, nie versuchen, sie zu fangen. Bei Biss: Druckverband, ruhigstellen, Notruf 000.",
    orte: ["mungo", "can", "syd", "byron", "bne", "mackay"], chance: "selten" },

  { k: "rotbauchschwarzotter", de: "Rotbauch-Schwarzotter", en: "Red-bellied Black Snake", la: "Pseudechis porphyriacus", typ: "land", gruppe: "Reptil",
    cm: 150, groesse: "1,2–1,5 m, bis 2 m", gewicht: "bis ca. 1,5 kg", essen: "Frösche, Eidechsen, Fische, andere Schlangen",
    fakt: "Eher friedlich und scheu, oft an Bächen und in den Blue Mountains zu sehen. Es ist kein Todesfall bekannt, ein Biss muss aber trotzdem im Krankenhaus behandelt werden.",
    gefahr: 3, tipp: "Abstand halten. Bei Biss: Druckverband, ruhigstellen, Notruf 000.", orte: ["can", "syd", "byron", "bne"], chance: "mittel" },

  { k: "buntwaran", de: "Buntwaran", en: "Lace Monitor (Goanna)", la: "Varanus varius", typ: "land", gruppe: "Reptil",
    cm: 150, groesse: "1,5–2 m", gewicht: "bis 14 kg", essen: "Vogeleier, Aas, kleine Tiere – und Reste vom Picknick",
    fakt: "Die zweitgrößte Echse Australiens klettert blitzschnell Bäume hoch. Ihr Speichel enthält ein mildes Gift.",
    gefahr: 2, tipp: "Nicht füttern. In Panik klettern sie manchmal an Menschen hoch, als wären sie ein Baum.", orte: ["syd", "byron", "bne", "cns"], chance: "mittel" },

  { k: "westgraueskaenguru", de: "Westliches Graues Riesenkänguru", en: "Western Grey Kangaroo", la: "Macropus fuliginosus", typ: "land", gruppe: "Säugetier",
    cm: 130, groesse: "Körper bis 1,4 m + Schwanz", gewicht: "Männchen bis 54 kg", essen: "Gräser, Sträucher",
    fakt: "Männchen riechen stark nach Curry und heißen deshalb im Englischen auch „Stinker“.",
    gefahr: 2, tipp: "Nicht bedrängen. Wildwechsel im Outback!", orte: ["mungo"], chance: "häufig" },

  { k: "trauerschwan", de: "Trauerschwan", en: "Black Swan", la: "Cygnus atratus", typ: "luft", gruppe: "Vogel",
    cm: 130, groesse: "1,1–1,4 m", gewicht: "4–9 kg", essen: "Wasserpflanzen, Algen",
    fakt: "Europäer hielten alle Schwäne für weiß, bis 1697 in Australien schwarze entdeckt wurden. Seitdem steht „Schwarzer Schwan“ für das völlig Unerwartete.",
    gefahr: 1, tipp: "Am Nest nicht zu nah ran, dann fauchen sie.", orte: ["mel", "can", "syd"], chance: "häufig" },

  { k: "papageifisch", de: "Büffelkopf-Papageifisch", en: "Green Humphead Parrotfish", la: "Bolbometopon muricatum", typ: "wasser", gruppe: "Fisch",
    cm: 130, groesse: "bis 1,3 m", gewicht: "bis 75 kg", essen: "Korallen und Algen, die er mit dem Schnabel abknackt",
    fakt: "Papageifische kauen Korallen und scheiden feinen weißen Sand aus. Ein großes Tier produziert mehrere Tonnen Sand im Jahr – viele Traumstrände bestehen teilweise daraus.",
    gefahr: 1, tipp: "Harmlos.", orte: ["whit", "cns"], chance: "selten" },

  { k: "riesenmuschel", de: "Riesenmuschel", en: "Giant Clam", la: "Tridacna gigas", typ: "wasser", gruppe: "Weichtier",
    cm: 120, groesse: "bis 1,2 m", gewicht: "über 200 kg", essen: "Zucker von Algen, die in ihrem Mantel leben, dazu Plankton",
    fakt: "Kann über 100 Jahre alt werden. Dass sie Taucher festklemmt, ist ein Mythos: Sie schließt sich viel zu langsam.",
    gefahr: 1, tipp: "Harmlos, nicht anfassen.", orte: ["whit", "cns"], chance: "mittel" },

  { k: "suppenschildkroete", de: "Suppenschildkröte", en: "Green Sea Turtle", la: "Chelonia mydas", typ: "wasser", gruppe: "Reptil",
    cm: 110, groesse: "Panzer bis 1,2 m", gewicht: "bis 200 kg", essen: "Seegras und Algen",
    fakt: "Wird bis zu 80 Jahre alt. Im November ist Eiablage: Die Weibchen kommen nachts an Queenslands Strände und legen je rund 100 Eier.",
    gefahr: 1, tipp: "Nicht anfassen, beim Schnorcheln ein paar Meter Abstand halten.", orte: ["byron", "whit", "cns"], chance: "mittel" },

  { k: "tigerotter", de: "Tigerotter", en: "Tiger Snake", la: "Notechis scutatus", typ: "land", gruppe: "Reptil",
    cm: 120, groesse: "1–1,5 m", gewicht: "ca. 1 kg", essen: "Frösche, Fische, Mäuse, Vögel",
    fakt: "Lebt gern an Sümpfen und Seeufern. Die Bänderung ist sehr unterschiedlich, manche Tigerottern sind fast ganz schwarz. Bei Bedrohung flacht sie den Hals ab wie eine Kobra.",
    gefahr: 5, tipp: "Hochgiftig. Auf Wegen bleiben, festes Schuhwerk. Bei Biss: Druckverband, ruhigstellen, Notruf 000.", orte: ["mel", "can"], chance: "selten" },

  { k: "dingo", de: "Dingo", en: "Dingo", la: "Canis dingo", typ: "land", gruppe: "Säugetier",
    cm: 100, groesse: "Körper ca. 1 m + 30 cm Schwanz", gewicht: "13–20 kg", essen: "Kängurus, Kaninchen, Wombats, Aas",
    fakt: "Kam vor rund 3.500 Jahren mit Seefahrern nach Australien. Dingos bellen kaum, sie heulen.",
    gefahr: 3, tipp: "Nie füttern, kein Essen liegen lassen. Kommt einer näher: aufrecht stehen, Arme verschränken, langsam rückwärts gehen.", orte: ["mungo", "cns"], chance: "selten" },

  { k: "wombat", de: "Nacktnasenwombat", en: "Common Wombat", la: "Vombatus ursinus", typ: "land", gruppe: "Säugetier",
    cm: 100, groesse: "0,9–1,15 m", gewicht: "20–35 kg", essen: "Gräser, Wurzeln, Rinde",
    fakt: "Macht würfelförmige Köttel! Kann bis 40 km/h rennen, und sein Beutel öffnet sich nach hinten, damit beim Graben keine Erde hineinfällt.",
    gefahr: 2, tipp: "Meist friedlich, kann aber beißen und Menschen umrennen. Abends auf Straßen in Wilsons Prom aufpassen.", orte: ["mel", "can", "syd"], chance: "häufig" },

  { k: "keilschwanzadler", de: "Keilschwanzadler", en: "Wedge-tailed Eagle", la: "Aquila audax", typ: "luft", gruppe: "Vogel",
    cm: 95, groesse: "0,9–1 m, Spannweite bis 2,3 m", gewicht: "3–5 kg", essen: "Kaninchen, junge Kängurus, Aas",
    fakt: "Der größte Greifvogel Australiens kreist bis in 2.000 m Höhe. Im Outback sitzt er oft an überfahrenen Kängurus am Straßenrand.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mungo", "can"], chance: "mittel" },

  { k: "leierschwanz", de: "Prachtleierschwanz", en: "Superb Lyrebird", la: "Menura novaehollandiae", typ: "land", gruppe: "Vogel",
    cm: 90, groesse: "Männchen 80–100 cm mit Schwanz", gewicht: "ca. 1 kg", essen: "Würmer, Insekten, Spinnen aus dem Waldboden",
    fakt: "Der beste Stimmenimitator der Welt: Er ahmt andere Vögel nach, aber auch Kettensägen, Autoalarm und Kameraauslöser. Er ist auf der australischen 10-Cent-Münze.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd"], chance: "mittel" },

  { k: "bennettwallaby", de: "Bennett-Wallaby", en: "Red-necked Wallaby", la: "Notamacropus rufogriseus", typ: "land", gruppe: "Säugetier",
    cm: 90, groesse: "70–90 cm + 70 cm Schwanz", gewicht: "14–24 kg", essen: "Gräser und Kräuter",
    fakt: "Der rötliche Nacken gab ihm den englischen Namen. Es ist eines der häufigsten Wallabys im Südosten.",
    gefahr: 1, tipp: "Harmlos. Nicht füttern.", orte: ["mel", "can", "syd", "byron"], chance: "häufig" },

  { k: "wasseragame", de: "Australische Wasseragame", en: "Eastern Water Dragon", la: "Intellagama lesueurii", typ: "land", gruppe: "Reptil",
    cm: 90, groesse: "bis 1 m mit Schwanz", gewicht: "bis 1 kg", essen: "Insekten, Würmer, kleine Fische, Früchte",
    fakt: "Kann bis zu 90 Minuten unter Wasser bleiben. Im City Botanic Garden in Brisbane laufen Dutzende zwischen den Picknickdecken herum.",
    gefahr: 1, tipp: "Harmlos.", orte: ["can", "syd", "byron", "bne"], chance: "häufig" },

  { k: "kragenechse", de: "Kragenechse", en: "Frilled-neck Lizard", la: "Chlamydosaurus kingii", typ: "land", gruppe: "Reptil",
    cm: 85, groesse: "bis 90 cm mit Schwanz", gewicht: "bis 1 kg", essen: "Insekten, Spinnen, kleine Echsen",
    fakt: "Spannt bei Gefahr einen bis zu 30 cm großen Kragen auf, faucht und rennt dann auf zwei Beinen davon.",
    gefahr: 1, tipp: "Harmlos.", orte: ["cns"], chance: "selten" },

  { k: "seeadler", de: "Weißbauch-Seeadler", en: "White-bellied Sea Eagle", la: "Icthyophaga leucogaster", typ: "luft", gruppe: "Vogel",
    cm: 80, groesse: "75–85 cm, Spannweite bis 2,2 m", gewicht: "2,5–4 kg", essen: "Fische, Seeschlangen, Wasservögel",
    fakt: "Holt Fische im Sturzflug von der Wasseroberfläche. Paare bleiben ein Leben lang zusammen und benutzen jahrelang dasselbe riesige Nest.",
    gefahr: 1, tipp: "Harmlos.", orte: ["syd", "byron", "bne", "whit", "cns"], chance: "mittel" },

  { k: "flinkwallaby", de: "Flinkwallaby", en: "Agile Wallaby", la: "Notamacropus agilis", typ: "land", gruppe: "Säugetier",
    cm: 80, groesse: "60–85 cm + Schwanz", gewicht: "11–27 kg", essen: "Gräser, Blätter, Wurzeln",
    fakt: "Bei Sonnenaufgang am Cape Hillsborough kommen Wallabys an den Strand und fressen angespülte Mangrovensamen. Das ist eines der berühmtesten Tierfotos Australiens.",
    gefahr: 1, tipp: "Harmlos. Nicht füttern.", orte: ["mackay", "whit", "cns"], chance: "häufig" },

  { k: "koala", de: "Koala", en: "Koala", la: "Phascolarctos cinereus", typ: "land", gruppe: "Säugetier",
    cm: 75, groesse: "60–85 cm", gewicht: "4–14 kg", essen: "Nur Eukalyptusblätter, etwa 500 g am Tag",
    fakt: "Schläft bis zu 20 Stunden am Tag, weil Eukalyptus kaum Energie liefert. Seine Fingerabdrücke sind kaum von menschlichen zu unterscheiden.",
    gefahr: 1, tipp: "Sehr scharfe Krallen. Wilde Koalas nie anfassen.", orte: ["mel", "bne", "whit"], chance: "mittel" },

  { k: "sumpfwallaby", de: "Sumpfwallaby", en: "Swamp Wallaby", la: "Wallabia bicolor", typ: "land", gruppe: "Säugetier",
    cm: 75, groesse: "65–85 cm + Schwanz", gewicht: "10–20 kg", essen: "Sträucher, Farne, Pilze – sogar Pflanzen, die für andere Tiere giftig sind",
    fakt: "Hüpft mit tief gehaltenem Kopf und gerade nach hinten gestrecktem Schwanz. Es ist das einzige Mitglied seiner Gattung.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "syd", "byron", "bne"], chance: "mittel" },

  { k: "buschhuhn", de: "Buschhuhn", en: "Australian Brushturkey", la: "Alectura lathami", typ: "land", gruppe: "Vogel",
    cm: 70, groesse: "60–75 cm", gewicht: "2–2,5 kg", essen: "Insekten, Samen, Früchte",
    fakt: "Das Männchen scharrt einen bis zu 4 t schweren Laubhaufen zusammen, in dem die Eier durch Kompostwärme ausgebrütet werden. Die Temperatur misst es mit dem Schnabel.",
    gefahr: 1, tipp: "Harmlos.", orte: ["syd", "byron", "bne", "mackay", "cns"], chance: "häufig" },

  { k: "ibis", de: "Molukkenibis", en: "Australian White Ibis („Bin Chicken“)", la: "Threskiornis molucca", typ: "luft", gruppe: "Vogel",
    cm: 70, groesse: "65–75 cm", gewicht: "1,5–2,5 kg", essen: "Insekten, Krebse – und Essensreste aus Mülleimern",
    fakt: "Heißt in Australien „Bin Chicken“ (Mülleimer-Huhn), weil er in Städten Mülltonnen plündert. Inzwischen ist er fast ein Kult-Maskottchen Sydneys.",
    gefahr: 1, tipp: "Pass auf deine Pommes auf.", orte: KUESTE, chance: "häufig" },

  { k: "rabenkakadu", de: "Gelbschwanz-Rabenkakadu", en: "Yellow-tailed Black Cockatoo", la: "Zanda funerea", typ: "luft", gruppe: "Vogel",
    cm: 62, groesse: "55–65 cm", gewicht: "600–900 g", essen: "Kiefernzapfen, Samen, Käferlarven aus dem Holz",
    fakt: "Nach einer alten Bauernregel kündigen seine klagenden Rufe Regen an. Mit dem kräftigen Schnabel reißt er ganze Äste auf, um Larven herauszuholen.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd"], chance: "mittel" },

  { k: "triel", de: "Langschwanztriel", en: "Bush Stone-curlew", la: "Burhinus grallarius", typ: "land", gruppe: "Vogel",
    cm: 55, groesse: "52–58 cm", gewicht: "ca. 650 g", essen: "Insekten, Frösche, Echsen, Samen",
    fakt: "Nachts klingt sein Ruf wie der Schrei einer Frau in Not. Viele Touristen in Brisbane und Cairns erschrecken sich. Bei Gefahr erstarrt er, statt wegzulaufen.",
    gefahr: 1, tipp: "Harmlos.", orte: ["bne", "mackay", "whit", "cns"], chance: "mittel" },

  { k: "blauzunge", de: "Östlicher Blauzungenskink", en: "Eastern Blue-tongued Lizard", la: "Tiliqua scincoides", typ: "land", gruppe: "Reptil",
    cm: 55, groesse: "bis 60 cm", gewicht: "bis 1 kg", essen: "Schnecken, Insekten, Früchte, Blüten",
    fakt: "Streckt bei Gefahr seine leuchtend blaue Zunge heraus und faucht. Gärtner mögen ihn, weil er Schnecken frisst.",
    gefahr: 1, tipp: "Harmlos, kann aber kräftig zwicken.", orte: ["mel", "can", "syd", "byron", "bne", "mackay"], chance: "mittel" },

  { k: "bartagame", de: "Östliche Bartagame", en: "Eastern Bearded Dragon", la: "Pogona barbata", typ: "land", gruppe: "Reptil",
    cm: 55, groesse: "bis 60 cm mit Schwanz", gewicht: "bis 500 g", essen: "Insekten, Blüten, Blätter",
    fakt: "Bläht bei Bedrohung einen schwarzen, stacheligen „Bart“ auf. Mit einem Winken des Vorderbeins zeigt sie Unterwerfung.",
    gefahr: 1, tipp: "Harmlos.", orte: ["can", "syd", "bne", "mackay"], chance: "mittel" },

  { k: "schnabeltier", de: "Schnabeltier", en: "Platypus", la: "Ornithorhynchus anatinus", typ: "wasser", gruppe: "Säugetier",
    cm: 50, groesse: "40–60 cm", gewicht: "0,7–2,4 kg", essen: "Insektenlarven, Würmer und Krebse vom Gewässergrund",
    fakt: "Legt Eier, findet Beute mit Elektrosensoren im Entenschnabel und leuchtet unter UV-Licht türkis. Im Eungella-Nationalpark (Broken River) sieht man es am besten früh morgens und in der Dämmerung.",
    gefahr: 2, tipp: "Männchen haben einen Giftsporn am Hinterbein. Ein Stich ist extrem schmerzhaft, aber nicht tödlich.", orte: ["mackay", "cns"], chance: "mittel" },

  { k: "gelbhaubenkakadu", de: "Gelbhaubenkakadu", en: "Sulphur-crested Cockatoo", la: "Cacatua galerita", typ: "luft", gruppe: "Vogel",
    cm: 48, groesse: "45–50 cm", gewicht: "800–900 g", essen: "Samen, Nüsse, Wurzeln, Beeren",
    fakt: "Kann über 70 Jahre alt werden. In Sydney haben Kakadus gelernt, Mülltonnen-Deckel aufzuklappen, und bringen es sich gegenseitig bei.",
    gefahr: 1, tipp: "Harmlos, aber sehr laut.", orte: ["mel", "can", "syd", "byron", "bne", "mackay", "cns"], chance: "häufig" },

  { k: "fuchskusu", de: "Fuchskusu", en: "Common Brushtail Possum", la: "Trichosurus vulpecula", typ: "land", gruppe: "Säugetier",
    cm: 45, groesse: "35–55 cm + Schwanz", gewicht: "1,5–4 kg", essen: "Blätter, Blüten, Früchte – in Städten auch Brot und Obstreste",
    fakt: "Wohnt gern auf Dachböden und macht nachts erstaunlich viel Lärm. In Neuseeland wurde er eingeschleppt und ist dort ein großer Schädling.",
    gefahr: 1, tipp: "Nicht füttern, kann kratzen.", orte: ALLE, chance: "häufig" },

  { k: "kookaburra", de: "Jägerliest (Lachender Hans)", en: "Laughing Kookaburra", la: "Dacelo novaeguineae", typ: "luft", gruppe: "Vogel",
    cm: 44, groesse: "40–47 cm", gewicht: "300–450 g", essen: "Insekten, Eidechsen, kleine Schlangen, Mäuse",
    fakt: "Sein „Lachen“ ist ein Reviergesang, meist morgens und abends: der klassische Wecker im Busch. Schlangen schlägt er gegen Äste, bis sie tot sind.",
    gefahr: 1, tipp: "Klaut gern Würstchen vom Grill.", orte: ["mel", "can", "syd", "byron", "bne", "mackay", "cns"], chance: "häufig" },

  { k: "eulenschwalm", de: "Eulenschwalm", en: "Tawny Frogmouth", la: "Podargus strigoides", typ: "luft", gruppe: "Vogel",
    cm: 44, groesse: "35–50 cm", gewicht: "300–550 g", essen: "Insekten, Würmer, Frösche, Mäuse",
    fakt: "Keine Eule! Tagsüber sitzt er steif auf einem Ast und sieht aus wie ein abgebrochener Zweig.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd", "bne", "cns"], chance: "selten" },

  { k: "koenigssittich", de: "Königssittich", en: "Australian King Parrot", la: "Alisterus scapularis", typ: "luft", gruppe: "Vogel",
    cm: 42, groesse: "40–44 cm", gewicht: "200–275 g", essen: "Samen, Früchte, Beeren",
    fakt: "Nur das Männchen hat einen komplett roten Kopf. Beim Weibchen ist der Kopf grün.",
    gefahr: 1, tipp: "Harmlos.", orte: ["can", "syd", "bne", "mackay"], chance: "mittel" },

  { k: "silbermoewe", de: "Silberkopfmöwe", en: "Silver Gull", la: "Chroicocephalus novaehollandiae", typ: "luft", gruppe: "Vogel",
    cm: 41, groesse: "38–44 cm", gewicht: "250–350 g", essen: "Fische, Krebse – und alles, was Menschen fallen lassen",
    fakt: "Die häufigste Möwe Australiens. Am Bondi Beach klauen sie Pommes direkt aus der Hand.",
    gefahr: 1, tipp: "Harmlos, aber frech.", orte: KUESTE, chance: "häufig" },

  { k: "ameisenigel", de: "Kurzschnabeligel", en: "Short-beaked Echidna", la: "Tachyglossus aculeatus", typ: "land", gruppe: "Säugetier",
    cm: 40, groesse: "30–45 cm", gewicht: "2–7 kg", essen: "Ameisen und Termiten, mit einer bis zu 18 cm langen Zunge",
    fakt: "Neben dem Schnabeltier das einzige eierlegende Säugetier. Das Junge heißt „Puggle“.",
    gefahr: 1, tipp: "Harmlos. Bei Gefahr gräbt er sich ein und zeigt nur noch Stacheln.", orte: ["mel", "mungo", "can", "syd", "bne", "mackay"], chance: "mittel" },

  { k: "steinfisch", de: "Echter Steinfisch", en: "Reef Stonefish", la: "Synanceia verrucosa", typ: "wasser", gruppe: "Fisch",
    cm: 38, groesse: "30–40 cm", gewicht: "bis 2 kg", essen: "Fische und Garnelen, die zu nah vorbeischwimmen",
    fakt: "Der giftigste Fisch der Welt sieht aus wie ein mit Algen bewachsener Stein und überlebt bis zu 24 Stunden außerhalb des Wassers.",
    gefahr: 5, tipp: "13 Giftstacheln auf dem Rücken: Drauftreten kann tödlich sein. Am Riff und im Watt immer Schuhe tragen. Bei Stich: Fuß in heißes Wasser und sofort Notruf 000.",
    orte: ["mackay", "whit", "cns"], chance: "selten" },

  { k: "rotfeuerfisch", de: "Pazifischer Rotfeuerfisch", en: "Red Lionfish", la: "Pterois volitans", typ: "wasser", gruppe: "Fisch",
    cm: 38, groesse: "bis 38 cm", gewicht: "bis 1,2 kg", essen: "Kleine Fische, Garnelen",
    fakt: "Treibt Beute mit seinen fächerartigen Brustflossen in die Enge und saugt sie dann blitzschnell ein.",
    gefahr: 3, tipp: "Giftige Rückenstacheln, ein Stich ist extrem schmerzhaft. Erste Hilfe: Wunde in heißes Wasser (ca. 45 °C).", orte: ["whit", "cns"], chance: "selten" },

  { k: "pennantsittich", de: "Pennantsittich", en: "Crimson Rosella", la: "Platycercus elegans", typ: "luft", gruppe: "Vogel",
    cm: 35, groesse: "32–37 cm", gewicht: "130–150 g", essen: "Samen, Früchte, Blüten",
    fakt: "Jungvögel sind zuerst grün und werden mit der Zeit leuchtend rot. In den Blue Mountains landen sie gern auf Touristen-Schultern.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd"], chance: "häufig" },

  { k: "rosakakadu", de: "Rosakakadu", en: "Galah", la: "Eolophus roseicapilla", typ: "luft", gruppe: "Vogel",
    cm: 35, groesse: "ca. 35 cm", gewicht: "270–350 g", essen: "Samen, Getreide, Wurzeln",
    fakt: "Im australischen Slang ist „galah“ ein Wort für einen Trottel, weil sie so albern herumturnen, zum Beispiel kopfüber an Stromleitungen.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mungo", "can", "syd", "bne"], chance: "häufig" },

  { k: "maskenkiebitz", de: "Maskenkiebitz", en: "Masked Lapwing (Plover)", la: "Vanellus miles", typ: "luft", gruppe: "Vogel",
    cm: 35, groesse: "30–37 cm", gewicht: "230–400 g", essen: "Insekten und Würmer",
    fakt: "Brütet einfach auf Rasenflächen, Parkplätzen und Flachdächern. Am Flügelbug hat er einen gelben Sporn.",
    gefahr: 1, tipp: "Verteidigt sein Nest laut mit Scheinangriffen. Einfach weitergehen.", orte: ALLE, chance: "häufig" },

  { k: "dornenkrone", de: "Dornenkronen-Seestern", en: "Crown-of-thorns Starfish", la: "Acanthaster solaris", typ: "wasser", gruppe: "Stachelhäuter",
    cm: 35, groesse: "25–35 cm, bis 80 cm", gewicht: "bis ca. 3 kg", essen: "Steinkorallen – er stülpt seinen Magen über die Koralle",
    fakt: "Bei Massenvermehrungen fressen sie ganze Riffabschnitte kahl. Sie gehören zu den größten Bedrohungen des Great Barrier Reef.",
    gefahr: 2, tipp: "Giftige Stacheln, Stiche entzünden sich schmerzhaft. Nicht anfassen.", orte: ["whit", "cns"], chance: "mittel" },

  { k: "tannenzapfenechse", de: "Tannenzapfenechse", en: "Shingleback (Sleepy Lizard)", la: "Tiliqua rugosa", typ: "land", gruppe: "Reptil",
    cm: 35, groesse: "30–40 cm", gewicht: "600–900 g", essen: "Blüten, Früchte, Schnecken, Insekten",
    fakt: "Speichert Fett im stummeligen Schwanz, der wie ein zweiter Kopf aussieht und Feinde verwirrt. Paare bleiben oft jahrzehntelang zusammen.",
    gefahr: 1, tipp: "Harmlos. Zeigt drohend die blaue Zunge, beißt aber selten.", orte: ["mungo", "can"], chance: "mittel" },

  { k: "zwergpinguin", de: "Zwergpinguin", en: "Little Penguin (Fairy Penguin)", la: "Eudyptula minor", typ: "wasser", gruppe: "Vogel",
    cm: 33, groesse: "30–33 cm", gewicht: "ca. 1 kg", essen: "Kleine Fische, Tintenfische",
    fakt: "Die kleinste Pinguinart der Welt. Auf Phillip Island watscheln jeden Abend nach Sonnenuntergang Hunderte aus dem Meer zu ihren Nestern: die „Penguin Parade“.",
    gefahr: 1, tipp: "Keine Fotos mit Blitz.", orte: ["mel", "syd"], chance: "häufig" },

  { k: "seestern", de: "Blauer Seestern", en: "Blue Sea Star", la: "Linckia laevigata", typ: "wasser", gruppe: "Stachelhäuter",
    cm: 30, groesse: "bis 30 cm", gewicht: "ca. 100–300 g", essen: "Algenbeläge und organische Partikel",
    fakt: "Aus einem abgetrennten Arm kann ein ganzer neuer Seestern nachwachsen.",
    gefahr: 1, tipp: "Harmlos, aber bitte im Wasser lassen.", orte: ["whit", "cns"], chance: "häufig" },

  { k: "wuerfelqualle", de: "Seewespe (Würfelqualle)", en: "Box Jellyfish", la: "Chironex fleckeri", typ: "wasser", gruppe: "Nesseltier",
    cm: 30, groesse: "Schirm bis 30 cm, Tentakel bis 3 m", gewicht: "bis 2 kg", essen: "Garnelen und kleine Fische",
    fakt: "Das giftigste Meerestier der Welt hat 24 Augen und schwimmt aktiv. Saison ist von November bis Mai an Queenslands Küste nördlich von Agnes Water – genau eure Reisezeit!",
    gefahr: 5, tipp: "Nur in Stinger-Netzen und mit Stinger-Suit (Lycra-Anzug) schwimmen. Bei Kontakt: Essig über die Tentakel gießen (nicht reiben), Notruf 000, notfalls Wiederbelebung.",
    orte: ["mackay", "whit", "cns"], chance: "selten" },

  { k: "laubenvogel", de: "Seidenlaubenvogel", en: "Satin Bowerbird", la: "Ptilonorhynchus violaceus", typ: "luft", gruppe: "Vogel",
    cm: 30, groesse: "27–33 cm", gewicht: "200–290 g", essen: "Früchte, Insekten, Blätter",
    fakt: "Das Männchen baut eine Laube und dekoriert sie nur mit blauen Dingen: Federn, Blüten, Wäscheklammern, Strohhalme.",
    gefahr: 1, tipp: "Harmlos.", orte: ["can", "syd", "bne"], chance: "mittel" },

  { k: "allfarblori", de: "Allfarblori", en: "Rainbow Lorikeet", la: "Trichoglossus moluccanus", typ: "luft", gruppe: "Vogel",
    cm: 28, groesse: "25–30 cm", gewicht: "120–160 g", essen: "Nektar und Pollen, dazu Früchte",
    fakt: "Hat eine Pinselzunge zum Nektarschlecken. Abends sammeln sich Tausende an Schlafbäumen, ohrenbetäubend laut.",
    gefahr: 1, tipp: "Harmlos.", orte: KUESTE, chance: "häufig" },

  { k: "flughund", de: "Graukopf-Flughund", en: "Grey-headed Flying Fox", la: "Pteropus poliocephalus", typ: "luft", gruppe: "Säugetier",
    cm: 27, groesse: "23–29 cm, Spannweite bis 1 m", gewicht: "600–1000 g", essen: "Nektar, Blüten, Früchte",
    fakt: "Fliegt nachts bis zu 50 km weit zu Futterbäumen und verteilt dabei Samen und Pollen. Abends ziehen Tausende über Melbourne (Yarra Bend) und Brisbane.",
    gefahr: 2, tipp: "Niemals anfassen: Flughunde können ein tollwutähnliches Virus (Lyssavirus) übertragen.", orte: ["mel", "syd", "byron", "bne"], chance: "häufig" },

  { k: "schwatzvogel", de: "Weißstirn-Schwatzvogel", en: "Noisy Miner", la: "Manorina melanocephala", typ: "luft", gruppe: "Vogel",
    cm: 26, groesse: "24–28 cm", gewicht: "60–80 g", essen: "Nektar, Insekten, Früchte",
    fakt: "Lebt in lauten Gruppen, die fast alle anderen kleinen Vögel aus ihrem Revier vertreiben. Selbst Kookaburras werden attackiert.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd", "bne", "mackay"], chance: "häufig" },

  { k: "floetenvogel", de: "Flötenvogel", en: "Australian Magpie", la: "Gymnorhina tibicen", typ: "luft", gruppe: "Vogel",
    cm: 40, groesse: "37–43 cm", gewicht: "220–350 g", essen: "Würmer, Insekten und Larven aus dem Rasen",
    fakt: "Einer der besten Sänger der Welt. Er kann Geräusche imitieren und erkennt einzelne Menschen wieder.",
    gefahr: 2, tipp: "Brutzeit August bis November: Männchen greifen im Sturzflug Köpfe an, vor allem bei Radfahrern. Hut oder Sonnenbrille tragen und das Gebiet zügig verlassen.",
    orte: ["mel", "mungo", "can", "syd", "byron", "bne", "mackay"], chance: "häufig" },

  { k: "faecherschwanz", de: "Gartenfächerschwanz", en: "Willie Wagtail", la: "Rhipidura leucophrys", typ: "luft", gruppe: "Vogel",
    cm: 20, groesse: "19–21 cm", gewicht: "17–24 g", essen: "Insekten",
    fakt: "Wedelt ständig mit dem Schwanz, um Insekten aufzuscheuchen. Er ist furchtlos und verjagt sogar Adler.",
    gefahr: 1, tipp: "Harmlos.", orte: ALLE, chance: "häufig" },

  { k: "blauring", de: "Großer Blauring-Krake", en: "Greater Blue-ringed Octopus", la: "Hapalochlaena lunulata", typ: "wasser", gruppe: "Weichtier",
    cm: 20, groesse: "12–20 cm mit Armen", gewicht: "ca. 80 g", essen: "Krebse, Garnelen",
    fakt: "Nur golfballgroß, aber sein Gift reicht für über 20 Menschen. Die blauen Ringe leuchten erst auf, wenn er sich bedroht fühlt. Verwandte Arten leben auch in Felspools bei Sydney und Melbourne.",
    gefahr: 5, tipp: "Der Biss ist oft schmerzlos, danach folgen Lähmung und Atemstillstand. Nie Kraken, Muscheln oder Schneckenhäuser aus Felspools nehmen. Im Notfall beatmen und Notruf 000.",
    orte: ["mel", "syd", "whit", "cns"], chance: "selten" },

  { k: "gleitbeutler", de: "Kurzkopfgleitbeutler", en: "Sugar Glider", la: "Petaurus breviceps", typ: "luft", gruppe: "Säugetier",
    cm: 18, groesse: "16–21 cm + Schwanz", gewicht: "100–160 g", essen: "Baumsäfte, Nektar, Insekten",
    fakt: "Gleitet mit einer Flughaut zwischen Vorder- und Hinterbeinen bis zu 50 m weit von Baum zu Baum. Seit 2020 unterscheidet man drei Arten.",
    gefahr: 1, tipp: "Harmlos. Nur nachts mit Taschenlampe zu entdecken.", orte: ["mel", "syd", "bne", "cns"], chance: "selten" },

  { k: "huntsman", de: "Riesenkrabbenspinne (Huntsman)", en: "Grey Huntsman Spider", la: "Holconia immanis", typ: "land", gruppe: "Spinnentier",
    cm: 15, groesse: "Beinspannweite bis 15 cm", gewicht: "wenige Gramm", essen: "Insekten, Schaben, kleine Geckos",
    fakt: "Riesig, schnell und läuft seitwärts. Sie versteckt sich gern hinter Sonnenblenden im Auto und hat dadurch schon Unfälle aus Schreck verursacht.",
    gefahr: 1, tipp: "Sehr scheu. Ein Biss ist schmerzhaft, aber harmlos.", orte: ALLE, chance: "häufig" },

  { k: "kegelschnecke", de: "Landkarten-Kegelschnecke", en: "Geographic Cone Snail", la: "Conus geographus", typ: "wasser", gruppe: "Weichtier",
    cm: 14, groesse: "10–16 cm", gewicht: "ca. 100 g", essen: "Kleine Fische – sie schießt einen giftigen Harpunenzahn ab",
    fakt: "Ihr Spitzname ist „Zigarettenschnecke“: Nach einem Stich bleibe angeblich nur noch Zeit für eine Zigarette. Aus ihrem Gift werden Schmerzmittel erforscht.",
    gefahr: 5, tipp: "Schöne Schneckenhäuser nie aufheben, auch keine scheinbar leeren.", orte: ["whit", "cns"], chance: "selten" },

  { k: "agakroete", de: "Aga-Kröte", en: "Cane Toad", la: "Rhinella marina", typ: "land", gruppe: "Amphibie",
    cm: 15, groesse: "10–15 cm, bis 24 cm", gewicht: "meist 100–500 g", essen: "Fast alles: Insekten, kleine Tiere, Tierfutter",
    fakt: "1935 gegen Zuckerrohrkäfer ausgesetzt, ein Desaster: Heute leben über 200 Millionen in Australien, und ihr Gift tötet Warane, Beutelmarder und Hunde.",
    gefahr: 2, tipp: "Giftdrüsen hinter dem Kopf. Nicht anfassen, Augen schützen, danach Hände waschen.", orte: ["byron", "bne", "mackay", "whit", "cns"], chance: "häufig" },

  { k: "staffelschwanz", de: "Prachtstaffelschwanz", en: "Superb Fairywren", la: "Malurus cyaneus", typ: "luft", gruppe: "Vogel",
    cm: 14, groesse: "ca. 14 cm", gewicht: "ca. 10 g", essen: "Insekten",
    fakt: "Nur die Männchen sind in der Brutzeit leuchtend blau. Sie pflücken gelbe Blütenblätter und überreichen sie den Weibchen als Geschenk.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mel", "can", "syd"], chance: "häufig" },

  { k: "ulysses", de: "Ulysses-Falter", en: "Ulysses Butterfly (Blue Emperor)", la: "Papilio ulysses", typ: "luft", gruppe: "Insekt",
    cm: 13, groesse: "Spannweite bis 14 cm", gewicht: "unter 1 g", essen: "Nektar",
    fakt: "Leuchtend blau, doch sobald er landet und die Flügel schließt, ist er braun und kaum zu sehen. Er gilt als Symbol des tropischen Nord-Queensland.",
    gefahr: 1, tipp: "Harmlos.", orte: ["mackay", "cns"], chance: "mittel" },

  { k: "zikade", de: "Grüne Riesenzikade", en: "Green Grocer Cicada", la: "Cyclochila australasiae", typ: "luft", gruppe: "Insekt",
    cm: 11, groesse: "Körper 4,5 cm, Spannweite 11 cm", gewicht: "ca. 3 g", essen: "Pflanzensaft (die Larven saugen jahrelang unterirdisch an Wurzeln)",
    fakt: "Eines der lautesten Insekten der Welt mit bis zu 120 Dezibel, so laut wie ein Rockkonzert. Im November schlüpfen sie massenhaft.",
    gefahr: 1, tipp: "Harmlos, nur laut.", orte: ["mel", "syd", "bne"], chance: "häufig" },

  { k: "clownfisch", de: "Orangeringel-Anemonenfisch", en: "Orange Clownfish („Nemo“)", la: "Amphiprion percula", typ: "wasser", gruppe: "Fisch",
    cm: 11, groesse: "bis 11 cm", gewicht: "ca. 20 g", essen: "Plankton, Algen",
    fakt: "Lebt geschützt zwischen den Nesseln einer Seeanemone. Alle Clownfische schlüpfen als Männchen. Stirbt das Weibchen, wird das größte Männchen zum Weibchen.",
    gefahr: 1, tipp: "Harmlos, verteidigt aber seine Anemone.", orte: ["whit", "cns"], chance: "häufig" },

  { k: "laubfrosch", de: "Korallenfinger-Laubfrosch", en: "Green Tree Frog", la: "Pelodryas caerulea", typ: "land", gruppe: "Amphibie",
    cm: 10, groesse: "7–11 cm", gewicht: "bis ca. 80 g", essen: "Insekten, Spinnen",
    fakt: "Sitzt in Queensland gern in Toiletten, Duschen und Regentonnen und kann bis zu 16 Jahre alt werden. Früher hieß er Litoria caerulea.",
    gefahr: 1, tipp: "Harmlos.", orte: ["bne", "mackay", "whit", "cns"], chance: "mittel" },

  { k: "seidenspinne", de: "Goldene Seidenspinne", en: "Golden Orb-weaver", la: "Trichonephila plumipes", typ: "land", gruppe: "Spinnentier",
    cm: 10, groesse: "Körper bis 3,5 cm, Beinspannweite bis 10 cm", gewicht: "ca. 2 g", essen: "Fliegen, Käfer, Zikaden",
    fakt: "Ihre goldglänzenden Netze sind bis zu 1 m groß, und ihre Seide ist reißfester als Stahl gleicher Dicke. Die Männchen sind winzig.",
    gefahr: 1, tipp: "Harmlos.", orte: ["syd", "byron", "bne", "mackay", "whit", "cns"], chance: "häufig" },

  { k: "bluebottle", de: "Blaue Flasche", en: "Bluebottle", la: "Physalia utriculus", typ: "wasser", gruppe: "Nesseltier",
    cm: 10, groesse: "Schwimmblase 5–15 cm, Tentakel mehrere Meter", gewicht: "wenige Gramm", essen: "Kleine Fische, Fischlarven",
    fakt: "Keine einzelne Qualle, sondern eine Kolonie aus vielen Einzeltieren. Bei auflandigem Wind werden sie zu Tausenden an die Strände gespült, und auch angespülte nesseln noch.",
    gefahr: 2, tipp: "Sehr schmerzhaft, selten gefährlich. Tentakel mit Meerwasser abspülen, dann 20 Minuten heißes Wasser (ca. 45 °C). Kein Essig!",
    orte: ["mel", "syd", "byron", "bne"], chance: "häufig" },

  { k: "trichternetzspinne", de: "Sydney-Trichternetzspinne", en: "Sydney Funnel-web Spider", la: "Atrax robustus", typ: "land", gruppe: "Spinnentier",
    cm: 3.5, groesse: "Körper 1,5–3,5 cm", gewicht: "wenige Gramm", essen: "Käfer, Schaben, Schnecken, kleine Echsen",
    fakt: "Gilt als gefährlichste Spinne der Welt. Gerade die kleineren Männchen sind besonders giftig und wandern von November bis März nachts auf Partnersuche, auch in Häuser und Pools.",
    gefahr: 5, tipp: "Seit dem Gegengift 1981 gab es keinen Todesfall mehr. Schuhe ausschütteln. Bei Biss: Druckverband, ruhigstellen, Notruf 000.", orte: ["syd"], chance: "selten" },

  { k: "gluehwuermchen", de: "Glühwürmchen (Leuchtmücke)", en: "Glow-worm", la: "Arachnocampa flava", typ: "land", gruppe: "Insekt",
    cm: 3, groesse: "Larve bis 3 cm", gewicht: "unter 1 g", essen: "Insekten, die an klebrigen, leuchtenden Fäden hängen bleiben",
    fakt: "Eigentlich die Larve einer Mücke. Sie leuchtet blaugrün, um Beute anzulocken – je hungriger, desto heller. Bei Brisbane z. B. am Natural Bridge im Springbrook-Nationalpark.",
    gefahr: 1, tipp: "Harmlos. Taschenlampen aus und kein Blitz.", orte: ["byron", "bne"], chance: "häufig" },

  { k: "bulldoggenameise", de: "Bulldoggenameise", en: "Bull Ant", la: "Myrmecia gulosa", typ: "land", gruppe: "Insekt",
    cm: 3, groesse: "bis 3 cm", gewicht: "unter 1 g", essen: "Nektar; für die Larven jagen sie Insekten",
    fakt: "Eine der größten Ameisen der Welt, mit riesigen Kiefern und sehr guten Augen. Sie verfolgt Eindringlinge aktiv.",
    gefahr: 3, tipp: "Der Stich ist sehr schmerzhaft und kann für Allergiker gefährlich werden.", orte: ["can", "syd", "bne"], chance: "mittel" },

  { k: "irukandji", bild: "img/irukandji.svg", de: "Irukandji-Qualle", en: "Irukandji Jellyfish", la: "Carukia barnesi", typ: "wasser", gruppe: "Nesseltier",
    cm: 1.5, groesse: "Schirm 1–2 cm, Tentakel bis 1 m", gewicht: "unter 1 g", essen: "Kleine Fische, Plankton",
    fakt: "Kaum größer als ein Fingernagel und fast unsichtbar. Der Stich fühlt sich harmlos an, nach etwa 30 Minuten folgt das „Irukandji-Syndrom“ mit extremen Schmerzen und Bluthochdruck.",
    gefahr: 5, tipp: "Kommt auch draußen am Riff vor: Bei Schnorcheltouren Stinger-Suit tragen! Essig auf die Stelle und Notruf 000.", orte: ["whit", "cns"], chance: "selten" },

  { k: "redback", de: "Rotrückenspinne", en: "Redback Spider", la: "Latrodectus hasselti", typ: "land", gruppe: "Spinnentier",
    cm: 1, groesse: "Weibchen ca. 1 cm, Männchen 3–4 mm", gewicht: "unter 1 g", essen: "Insekten, Asseln, sogar kleine Echsen",
    fakt: "Eine enge Verwandte der Schwarzen Witwe. Sie versteckt sich gern unter Klobrillen von Plumpsklos, unter Gartenmöbeln und in Schuhen.",
    gefahr: 4, tipp: "Biss sehr schmerzhaft mit Schweißausbrüchen und Übelkeit, aber kaum tödlich. Kühlen und zum Arzt, KEIN Druckverband.", orte: ALLE, chance: "mittel" },

  { k: "weberameise", de: "Grüne Weberameise", en: "Green Tree Ant", la: "Oecophylla smaragdina", typ: "land", gruppe: "Insekt",
    cm: 0.9, groesse: "7–10 mm", gewicht: "wenige Milligramm", essen: "Insekten, Honigtau",
    fakt: "Arbeiterinnen halten Blätter zusammen und verkleben sie mit Seide ihrer Larven zu Nestern. Das grüne Hinterteil schmeckt nach Limette und ist traditionelles „Bush Tucker“.",
    gefahr: 1, tipp: "Beißt und spritzt Ameisensäure. Zwickt, ist aber harmlos.", orte: ["mackay", "whit", "cns"], chance: "häufig" },

  { k: "zecke", de: "Australische Lähmungszecke", en: "Paralysis Tick", la: "Ixodes holocyclus", typ: "land", gruppe: "Spinnentier",
    cm: 0.4, groesse: "3–4 mm, vollgesogen bis 13 mm", gewicht: "Milligramm", essen: "Blut",
    fakt: "Ihr Speichel enthält ein Nervengift, das bei Hunden und selten auch bei Menschen Lähmungen auslöst. Sie lebt im Küstenbusch.",
    gefahr: 3, tipp: "Nach Buschwanderungen absuchen. In Australien wird empfohlen, die Zecke mit Kältespray abzutöten und abfallen zu lassen, statt sie zu quetschen.",
    orte: ["syd", "byron", "bne", "mackay", "cns"], chance: "mittel" },
];
