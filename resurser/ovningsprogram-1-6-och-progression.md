# Övningsprogram 1-6 och progression

## Syfte

Den här anteckningen sammanfattar vad referensbilderna faktiskt säger om `Övning 1-6`, hur ofta de ska göras och när användaren bör gå vidare.

Det här är underlag för appens programflöde, progression, ljudstöd och framtida gamification.

## Det vi kan läsa ut säkert

- Grundprogrammet är tänkt att göras `tre gånger om dagen`.
- `Övning 1-3` byts ut efter `tre dagar` per nivå.
- `Övning 4-5` byts ut efter `1-2 veckor` per nivå.
- `Övning 6` byts ut efter `1-2 veckor` till `Avancerade övningar`, eller fortsätter tills total träningstid nått `tre månader`.
- Referensen visar alltså både `antal gånger per dag` och `rekommenderad period per nivå`.

## Sammanställning av Övning 1-6

| Nivå | Innehåll | Kroppsläge | Frekvens | Rekommenderad period | Kommentar |
| --- | --- | --- | --- | --- | --- |
| Övning 1 | `8 Hitta-rätt-knip` | Liggande enklast, alternativt sittande eller stående | `3 ggr/dag` | `3 dagar` | Ren introduktion |
| Övning 2 | `6 Hitta-rätt-knip`, `2 Styrkeknip` | Liggande enklast, alternativt sittande eller stående | `3 ggr/dag` | `3 dagar` | Första progressionen |
| Övning 3 | `5 Hitta-rätt-knip`, `5 Styrkeknip` | Liggande, sittande eller stående | `3 ggr/dag` | `3 dagar` | Jämnare blandning |
| Övning 4 | `8 Styrkeknip`, `1 Uthållighetsknip (15 sek)` | Sittande eller stående | `3 ggr/dag` | `1-2 veckor` | Första uthållighetsnivån |
| Övning 5 | `10 Styrkeknip`, `1 Uthållighetsknip (25 sek)` | Stående | `3 ggr/dag` | `1-2 veckor` | Högre belastning |
| Övning 6 | `10 Styrkeknip`, `1 Uthållighetsknip (35 sek)`, `5 Snabba knip` | Stående | `3 ggr/dag` | `1-2 veckor` eller tills `3 månader` total träning | Full grundnivå |

## Vad detta betyder för vår app

### 1. Programmet bör vara styrt, inte bara valfritt

Det finns ett tydligt progressionstänk i materialet:

- användaren ska gå från `Övning 1` till `Övning 6`
- nivåerna har olika rekommenderad längd
- programmet är inte bara en lista med fristående pass

Det talar för att appen bör ha ett `programläge` där nästa nivå föreslås automatiskt.

### 2. Vi behöver två sorters progression

Appen behöver hålla reda på:

- `passprogression`: hur många pass användaren gjort på nuvarande nivå
- `tidsprogression`: hur många dagar användaren varit på nuvarande nivå

Det räcker alltså inte att bara räkna antal slutförda pass om vi vill följa referensens logik.

### 3. Ljudstöd passar bra till det här upplägget

Eftersom användaren ska göra passen ofta och återkommande är ljud viktigt:

- separat ljud för `start`
- separat ljud för `knip`
- separat ljud för `vila`
- särskilt ljud för `snabba knip`
- gärna tydlig signal när ett block byter typ, till exempel från `styrka` till `uthållighet`

Det gör att användaren kan köra passet utan att titta på skärmen.

## Förslag på produktlogik för nivåbyte

### Enkel logik som följer referensen

- `Övning 1-3`: föreslå nästa nivå efter `3 dagar`
- `Övning 4-6`: föreslå nästa nivå efter `7-14 dagar`
- användaren kan gå vidare tidigare, men appen markerar rekommenderad takt

### Smartare logik för verklig användning

Vi kan väga in både dagar och genomförda pass:

- nivå klar när användaren både nått rekommenderat antal dagar och gjort ett minimiantal pass
- om användaren missar dagar, stannar nivån kvar utan att det känns som ett misslyckande
- appen kan visa `dag 2 av 3` eller `vecka 1 av 2` i stället för hårda krav

## Din idé om övergång mellan nivåer

Det här är en stark idé och passar särskilt bra mellan nivåer där innehållet ändras tydligt.

### Föreslagen övergångsmodell

- dag 1: `1 ny + 2 gamla pass`
- dag 2: `2 nya + 1 gammalt pass`
- dag 3: `bara nya pass`

## Tolkning av övergångsmodellen

Det här ger flera fördelar:

- mjukare övergång till svårare övningar
- mindre risk att användaren hoppar av när nivån känns för stor
- lätt att bygga som gamification, eftersom appen kan visa `du håller på att låsa upp nästa nivå`
- passar extra bra om `Övning 4`, `5` och `6` känns markant längre eller mer krävande

## Rekommendation för implementation

Jag skulle dela upp det i två lägen:

### Grundläge

- användaren följer referensens nivåer rakt av
- appen föreslår nivåbyte när rekommenderad period uppnåtts

### Mjuk övergång

- aktiveras när användaren går från en nivå till nästa
- används särskilt från `Övning 3` till `4`, `4` till `5` och `5` till `6`
- kan också användas när användaren går in i `Avancerad 1`

## Förslag för gamification

- Visa `Övning 2 av 6` tydligt i programmet.
- Visa `dag 1 av 3` eller `vecka 1 av 2` på aktiv nivå.
- Lås upp nästa nivå visuellt när kriterierna är uppfyllda.
- Ge en lugn belöning när en nivå är klar, till exempel `Nivå klar`.
- Markera längre pass som `långt pass` och ge möjlighet att välja `kortare repetitionspass` på avancerade nivåer.

## Öppen fråga för nästa steg

Det vi fortfarande inte har extraherat är exakt innehåll för `Avancerad 3-6` och om de tydligt kan grupperas som `korta`, `normala` och `långa`.

Det är nästa naturliga steg om vi vill designa:

- repetitionspass för avancerade nivåer
- möjlighet att hoppa över de längsta passen
- en tydlig struktur för vilka pass som ska vara standard och vilka som ska vara valbara
