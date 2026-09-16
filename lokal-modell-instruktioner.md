# Instruktioner till lokal modell
Du ska fortsätta utveckla appen `Knip` i den här mappen:

`/Users/johan/Documents/Projekt/Knip`

Appen är en enkel mobil-först PWA för knipövningar. Den ska fungera som statiska filer, utan buildsteg och utan externa beroenden.

## Läs detta först

Läs filerna i den här ordningen innan du ändrar kod:

1. `AGENT.md`
2. `todo.md`
3. `resurser/referensanalys-och-utvecklingsplan.md`
4. `resurser/ovningsprogram-1-6-och-progression.md`
5. `resurser/utvecklingsideer.md`
6. `index.html`
7. `app.js`
8. `styles.css`
9. `service-worker.js`

## Projektets ramar

- Använd ren HTML, CSS och JavaScript.
- Lägg inte till npm, bundler, framework eller externa paket.
- Appen ska fortsätta fungera offline efter första laddning.
- Spara lokal historik, inställningar och progression i `localStorage`.
- Behåll svensk text i gränssnitt och dokumentation.
- Bygg mobile-first med stora tryckytor och lugn, tydlig design.
- Var försiktig med medicinska påståenden. Appen är träningsstöd, inte rådgivning.
- Revertera inte befintliga ändringar utan uttrycklig instruktion.

## Nuvarande app

Appen har redan:

- startsida
- snabbstart av enkelt pass
- timer med `Förbered`, `Knip` och `Vila`
- paus, fortsätt och avbryt
- klarvy
- statistik
- inställningar
- vibration om `navigator.vibrate` stöds
- PWA-manifest och service worker

Huvudlogiken ligger i `app.js`. UI-strukturen ligger i `index.html`. Visuell stil ligger i `styles.css`.

## Viktig produktinriktning

Nästa version ska inte bara vara en fri timer. Den ska börja bli ett styrt träningsprogram.

Målet är:

- användaren ska kunna gå igenom `Övning 1-6`
- appen ska veta vilken nivå användaren är på
- varje nivå ska ha tydligt innehåll, rekommenderad period och antal pass per dag
- appen ska kunna föreslå nästa nivå
- framtida version ska stödja avancerade repetitionspass
- längre pass ska kunna märkas och i vissa fall hoppas över
- ljud ska göra det möjligt att köra pass utan att titta på skärmen
- påminnelser ska senare vara snoozbara, men plattformsstödet måste kontrolleras innan implementation

## Första utvecklingsuppgift

Börja med att göra träningsprogrammen datadrivna.

Implementera helst i små steg:

1. Lägg till en datamodell i `app.js` för `Övning 1-6`.
2. Skapa en enkel programvy i `index.html`.
3. Lägg till knapp från startsidan till programvyn.
4. Visa nivåerna i ordning med titel, kort innehåll och rekommenderad period.
5. Låt användaren starta ett pass från vald nivå.
6. Spara genomfört pass med `programId` eller `levelId` i historiken.
7. Behåll befintlig snabbstart tills programflödet är stabilt.

Gör inte påminnelser, ljud eller gamification som första kodändring. De bör byggas ovanpå en stabil programmodell.

## Föreslagen datamodell

Exempelstruktur:

```js
const EXERCISE_LEVELS = [
  {
    id: "exercise-1",
    title: "Övning 1",
    periodLabel: "3 dagar",
    sessionsPerDay: 3,
    position: "Liggande enklast, alternativt sittande eller stående",
    blocks: [
      {
        type: "find",
        label: "Hitta-rätt-knip",
        repetitions: 8,
        squeezeSeconds: 2,
        restSeconds: 2
      }
    ]
  }
];
```

Anpassa sekunderna utifrån vad som redan finns i appen om referensen inte anger exakt tid. Markera gärna osäkra värden i kodkommentar eller dokumentation i stället för att låtsas att de är verifierade.

## Känd progression från underlaget

- `Övning 1`: `8 Hitta-rätt-knip`, `3 ggr/dag`, byt efter `3 dagar`.
- `Övning 2`: `6 Hitta-rätt-knip`, `2 Styrkeknip`, `3 ggr/dag`, byt efter `3 dagar`.
- `Övning 3`: `5 Hitta-rätt-knip`, `5 Styrkeknip`, `3 ggr/dag`, byt efter `3 dagar`.
- `Övning 4`: `8 Styrkeknip`, `1 Uthållighetsknip (15 sek)`, `3 ggr/dag`, byt efter `1-2 veckor`.
- `Övning 5`: `10 Styrkeknip`, `1 Uthållighetsknip (25 sek)`, `3 ggr/dag`, byt efter `1-2 veckor`.
- `Övning 6`: `10 Styrkeknip`, `1 Uthållighetsknip (35 sek)`, `5 Snabba knip`, `3 ggr/dag`, byt efter `1-2 veckor` eller fortsätt tills total träningstid är `3 månader`.

## Progressionslogik att förbereda för

Bygg gärna datastrukturen så den senare kan stödja:

- aktiv nivå
- startdatum för nivån
- antal genomförda pass på nivån
- antal pass idag
- föreslagen nivåväxling
- mjuk övergång mellan nivåer

Den mjuka övergången ska kunna se ut så här:

- dag 1: `1 nytt + 2 gamla pass`
- dag 2: `2 nya + 1 gammalt pass`
- dag 3: `bara nya pass`

Implementera inte hela övergångslogiken direkt om det gör första ändringen stor. Förbered hellre datamodellen och spara rätt historik.

## Ljud senare

Ljud ska senare stödja skärmfri träning.

Förbered kod med separata fasnamn så det går att koppla ljud till:

- `start`
- `knip`
- `vila`
- `hitta-rätt-knip`
- `styrkeknip`
- `uthållighetsknip`
- `snabba knip`
- `pass klart`

Använd inte externa ljudfiler utan beslut. Om ljud byggs tidigt, använd Web Audio API med enkla toner så appen fortfarande är helt lokal.

## Påminnelser senare

Påminnelser ska vara snoozbara, men bygg inte detta innan plattformsstödet är verifierat på iPhone-PWA.

Beslut som behövs före implementation:

- om notiser ska fungera utanför appen eller bara inne i appen
- vilka snoozeval som finns, till exempel `10 min`, `30 min`, `1 timme`
- om snooze ska begränsas per dag
- hur appen visar `aktiv`, `snoozad` och `avstängd`

## Gamification senare

Första versionens gamification bör vara enkel:

- visa `Övning X av 6`
- visa dagens pass, till exempel `1 av 3 idag`
- visa nivåstatus, till exempel `dag 2 av 3`
- ge lugn bekräftelse när en nivå är klar
- undvik stressande straff vid missade dagar

## Kontroll efter ändring

Efter varje kodändring:

1. Starta lokal server med `python3 -m http.server`.
2. Öppna appen i webbläsare.
3. Testa minst hemvy, programvy, start av pass, paus, avbryt, klarvy, statistik och inställningar.
4. Kontrollera konsolen för JavaScript-fel.
5. Kontrollera att service worker-cache uppdateras om statiska filer ändrats.

Om du ändrar filer som cacheas i `service-worker.js`, höj `CACHE_NAME`, till exempel från `knip-cache-v1` till `knip-cache-v2`.

## Bra första pull/patch

En bra första patch är liten och bör innehålla:

- datamodell för `Övning 1-6`
- programvy
- start från vald nivå
- historik som vet om passet var snabbstart eller programnivå
- cache-version höjd i service worker

Vänta med:

- avancerad 1-6
- snoozbara påminnelser
- full gamification
- ljuddesign
- stora visuella omgörningar
