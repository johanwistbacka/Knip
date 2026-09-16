# Utvecklingsidéer för Knip

## Syfte

Den här anteckningen samlar möjliga nästa steg för appen, från små förbättringar till större produktidéer.

## Kortsiktiga idéer

- Lägg till en tydligare startvy med snabbval för `Starta pass`, `Program` och `Statistik`.
- Visa en kort dagsstatus på startsidan, till exempel senaste pass och antal pass senaste veckan.
- Förbättra avslutsskärmen med en tydligare sammanfattning av genomfört pass.
- Gör knappar för pausa, fortsätt och avbryt ännu tydligare för mobil användning.
- Lägg till mjuka visuella skiften mellan faserna `Förberedelse`, `Knip` och `Vila`.
- Lägg till ljudsignaler så att pass kan genomföras utan att användaren tittar på skärmen.
- Ge `Knip`, `Paus` och olika kniptyper egna ljudbilder så att faserna känns igen direkt på gehör.

## Innehåll och träningsstöd

- Introducera olika kniptyper som egna begrepp i appen:
  - `Hitta-rätt-knip`
  - `Styrkeknip`
  - `Uthållighetsknip`
  - `Snabba knip`
- Skapa en enkel hjälpskärm som förklarar varje kniptyp med kort text.
- Lägg till korta tips om kroppshållning och andning före ett pass.
- Bygg en liten kunskapsdel med vanliga råd utan att skapa texttunga skärmar.

## Program och progression

- Skapa färdiga programnivåer som `Övning 1`, `Övning 2` och vidare progression.
- Låt huvudflödet ta användaren genom `Övning 1` till `Övning 6` i ordning.
- Låt användaren välja mellan `snabbpass` och `programbaserat pass`.
- Spara vilken nivå användaren senast tränade på.
- Visa enkel progression över tid, till exempel `du har genomfört 3 pass på denna nivå`.
- Lägg till rekommenderad längd för hur länge en nivå bör användas.
- Bygg repetitionspass för de mer avancerade övningarna efter att grundstegen `1-6` är klara.
- Låt användaren hoppa över de längsta passen utan att tappa hela progressionen.
- Märk upp pass som `kort`, `normal` och `lång` så att längd blir tydlig innan start.
- Testa en övergångsmodell mellan nivåer:
  - dag 1: `1 ny + 2 gamla`
  - dag 2: `2 nya + 1 gammal`
  - dag 3: `bara ny övning`
- Utred om övergångsmodellen ska styras av dagar, antal genomförda pass eller båda.

## Statistik och motivation

- Utöka statistikvyn med veckovy eller kalenderöversikt.
- Lägg till träningsstreak för att stärka vana.
- Visa fördelning mellan olika typer av pass eller nivåer.
- Visa personliga milstolpar, till exempel första passet, fem pass och tio pass.
- Lägg till en enkel motivationsrad som känns lugn och diskret.
- Koppla påminnelser till användarens träningsvana, till exempel morgon, lunch eller kväll.
- Visa tydligt hur långt användaren kommit i programmet, till exempel `Övning 4 av 6`.
- Lägg till belöningar för slutförda nivåer, streaks och återkomst efter uppehåll.
- Ge användaren känslan av upplåsning när repetitionspass eller avancerade pass blir tillgängliga.

## Påminnelser

- Lägg till dagliga eller återkommande påminnelser för träning.
- Gör påminnelser snoozbara med snabba val som `10 min`, `30 min` och `1 timme`.
- Visa tydligt om en påminnelse är aktiv, snoozad eller avstängd.
- Låt användaren välja hur många gånger en påminnelse får snoozas samma dag.
- Spara senaste snooze-val så att appen kan föreslå samma val igen.
- Koppla påminnelser till ett enkelt träningsmål, till exempel `1 pass per dag`.
- Utred om snooze ska fungera från notisen direkt, i appen, eller båda delarna beroende på plattformsstöd.

## Teknik och PWA

- Säkerställ att offline-läget även täcker statistik och inställningar på ett robust sätt.
- Förbättra service worker-strategin för tydligare cacheuppdateringar.
- Testa vibrationer mer noggrant på iPhone för att förstå begränsningar i PWA-läge.
- Utred hur ljud bäst triggas och fortsätter fungera stabilt i Safari och iPhone-PWA.
- Förbered kodstrukturen för datadrivna träningsprogram i stället för enbart fasta tider.
- Lägg till bättre skydd mot felaktiga eller tomma värden i `localStorage`.
- Verifiera vilket stöd iPhone-PWA faktiskt ger för lokala notiser, push och snooze-flöden innan funktionen byggs fullt ut.

## Tillgänglighet och UX

- Säkerställ god kontrast i alla faser av timern.
- Lägg till tydlig fokusmarkering för tangentbordsnavigering där det är relevant.
- Förbättra textstorlekar och avstånd för mindre iPhone-skärmar.
- Gör statusmeddelanden tydliga även utan vibration eller animation.
- Se över språktonen så att appen känns stödjande, enkel och trygg.

## Långsiktiga idéer

- En mer visuell historik med kalendermarkeringar.
- Anpassade program för olika mål eller nivåer.
- Export eller återställning av träningshistorik.
- Flera visuella teman med samma lugna grundkänsla.

## Prioriteringsförslag

1. Tydligare startvy och förbättrat passflöde
2. Ljudsignaler för skärmfri träning
3. Programnivåer och datamodell för träningsinnehåll
4. Hjälpskärmar för kniptyper och råd
5. Utökad statistik, gamification och snoozbara påminnelser
