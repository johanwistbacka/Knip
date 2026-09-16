# Referensanalys och utvecklingsplan

## Syfte

Det här dokumentet sammanfattar vad skärmbilderna i `resurser/` visar och hur de kan användas som underlag för nästa version av Knip-appen.

Målet är inte att kopiera utseende eller layout från referensbilderna, utan att använda dem för att förstå övningarnas uppbyggnad, progression och informationsflöde. UI:t i vår app ska förbättras och göras mer logiskt, men förklaringarna till övningarna måste finnas kvar någonstans i upplevelsen.

## Vad bilderna visar

## Skärmbildssteg

1. `Övning 1` med enbart `Hitta-rätt-knip`. Hälsa: tydlig och bra som introduktion.
2. `Övning 2` med `Hitta-rätt-knip` och `Styrkeknip`. Hälsa: visar progression på ett enkelt sätt.
3. `Övning 3` med jämnare fördelning mellan två kniptyper. Hälsa: konsekvent struktur.
4. `Övning 4` introducerar `Uthållighetsknip`. Hälsa: stark struktur, bra nivåskifte.
5. `Övning 5` ökar styrka och uthållighet. Hälsa: tydlig progression, fortfarande lätt att läsa.
6. `Övning 6` introducerar `Snabba knip` och vardagstips. Hälsa: innehållsrik och bra som programreferens.
7. `Avancerad 1` blandar flera kniptyper i ett längre upplägg. Hälsa: bra för vana, mer komplex än MVP.
8. `Avancerad 2` ökar mängden `Snabba knip`. Hälsa: konsekvent, data-driven struktur passar bra i kod.
9. `Avancerad 3` kopplar träning till lyft. Hälsa: bra verklighetsförankring, mer instruktionstext.
10. `Avancerad 4` kopplar träning till gång. Hälsa: pedagogisk och bra som innehållsreferens.
11. `Avancerad 5` kopplar träning till hosta. Hälsa: relevant scenario, högre kognitiv belastning.
12. `Avancerad 6` är ett fullskaligt avancerat program. Hälsa: stark som långsiktig programreferens.
13. `Prova knipen` listar kniptyper med ikon och kort förklaring. Hälsa: mycket bra som framtida hjälpskärm.
14. Del av stödtext för att hitta rätt knip. Hälsa: nyttigt innehåll, men inte tillräckligt kontext i just bilden.
15. `Tips om träningen` med flera pedagogiska block. Hälsa: värdefull källa för stödtexter.
16. `Statistik` med kalendervy. Hälsa: sekundär för detta arbete.
17. `Påminnelser` med mål och flera toggle-rader. Hälsa: sekundär för detta arbete.
18. `Hur ska jag träna?` och längre råd om träningsupplägg. Hälsa: bra referens för förklarande innehåll.

### 1. Tydlig progression i nivåer

Referensen bygger upp träningen som en serie nivåer:

- `Övning 1` till `Övning 6`
- `Avancerad 1` till `Avancerad 6`

Varje nivå beskriver:

- vilka kniptyper som ingår
- antal repetitioner
- ibland varaktighet i sekunder
- rekommenderad kroppsställning
- hur länge man bör ligga kvar på nivån

### 2. Fyra återkommande kniptyper

Bilderna återanvänder ett litet, tydligt språk för övningstyper:

- `Hitta-rätt-knip`
- `Styrkeknip`
- `Uthållighetsknip`
- `Snabba knip`

Det här är ett starkt mönster. Det gör innehållet lätt att förstå och ger ett bra underlag för en enkel innehållsmodell i appen.

### 3. Förklarande innehåll finns parallellt med övningarna

Referensen innehåller flera stödskärmar:

- `Prova knipen`
- `Tips om träningen`
- `Hur ska jag träna?`

Det viktiga här är inte layouten, utan att förklaringarna finns nära träningsflödet. För vår PWA betyder det att vi bör bära över innehållet, men presentera det i en enklare och mer logisk form, till exempel som korta informationskort, hjälpsektioner eller expanderbara block.

### 4. Statistik och påminnelser finns i referensen men är inte huvudspåret nu

Det finns också skärmar för:

- kalenderbaserad statistik
- träningsmål
- påminnelser

Det här visar att referensprodukten tänker långsiktigt, men i vårt arbete nu är det viktigare att först få övningarnas struktur, progression och begriplighet rätt.

## Tolkning för nuvarande PWA

Nuvarande app är redan bra som enkel träningsstart:

- snabb att öppna
- tydlig timer
- enkel statistik
- bra som offline-PWA

Det referensbilderna tillför är framför allt:

- ett tydligare träningsprogram
- bättre logik mellan nivåer
- förklaringar som stödjer förståelse
- bättre grund för ett mer genomtänkt UI

Det betyder att nästa utvecklingssteg bör fokusera på att bygga ett mer logiskt programflöde ovanpå nuvarande timer, och samtidigt ge användaren rätt förklaringar på rätt plats.

## Designriktning för vår app

UI:t ska inte efterlikna referensbilderna. Det ska istället:

- kännas enklare, lugnare och tydligare
- ge användaren ett självklart nästa steg
- minska mängden text som visas samtidigt
- behålla förklaringarna som stöd, men inte låta dem dominera huvudflödet

Begränsningar i analysen:

- bilderna visar främst innehållsstruktur, inte faktisk interaktion
- de säger mycket om övningarnas progression, men mindre om hur vår PWA bör se ut visuellt
- därför bör vi använda dem som innehållsreferens, inte som UI-mall

## Rekommenderad utvecklingsplan

### Fas 1. Gör flödet logiskt från start

Mål: göra appen begriplig direkt, med tydlig väg från start till vald övning till genomfört pass.

Föreslagna delar:

- lägg till en startvy där användaren kan välja `Snabbstart` eller `Program`
- gör `Program` till platsen där nivåerna `Övning 1`, `Övning 2` och vidare visas i ordning
- visa korta sammanfattningar per nivå så att användaren förstår vad den innehåller innan start
- lägg till en tydlig väg till förklaringar som `Vad betyder styrkeknip?`

Varför först:

- det gör appen mer logisk
- det gör övningsinnehållet användbart direkt
- det förbättrar UI utan att kräva tung teknik

### Fas 2. Inför en tydlig modell för övningar och nivåer

Mål: låta appen beskriva nivåer som `Övning 1`, `Övning 2` och så vidare.

Föreslagen modell per nivå:

- `id`
- `title`
- `types`
- `counts`
- `durationSeconds`
- `position`
- `summary`
- `guidance`
- `recommendedPeriod`

Det här gör att vi kan:

- visa programöversikt
- generera detaljvyer från data
- senare koppla nivåerna till faktiska pass

### Fas 3. Koppla nivåval till träningspasset

Mål: låta användaren starta ett pass från en vald nivå.

Föreslagen funktion:

- användaren väljer nivå, till exempel `Övning 4`
- appen visar en kort detaljvy med innehåll och förklaring
- användaren startar passet från den nivån
- timerflödet använder rätt antal och rätt längder

Det här är den viktigaste produktutvecklingen eftersom det förvandlar referensens statiska instruktioner till verklig interaktivitet.

### Fas 4. Placera förklaringarna där de hjälper mest

Mål: göra träningsinnehållet tryggt och lätt att ta till sig.

Bör inkludera:

- kort guide för `Hitta rätt knip`
- kort guide för kroppslägen
- kort guide för de olika kniptyperna
- tips för vardagsanvändning
- enkel text om hur länge man bör träna

Bra placering i appen:

- som hjälpkort på programsidan
- som detaljtext på nivåvyn
- som separat `Hjälp`- eller `Förklaringar`-vy
- eventuellt som expanderbara block under ett pass eller efter avslutat pass

### Fas 5. Förbättra UI:t runt hela flödet

Mål: göra upplevelsen tydligare, lugnare och mer sammanhängande.

Bör inkludera:

- bättre navigationslogik mellan hem, program, pass, statistik och hjälp
- tydligare hierarki i knappar och rubriker
- mer konsekvent informationsmängd per skärm
- mindre beroende av att användaren måste förstå allt på en gång

## Prioriteringsordning

Om vi vill få mest värde med minst komplexitet bör vi ta det i den här ordningen:

1. Logisk startvy och programstruktur
2. Datamodell för nivåer och kniptyper
3. Starta pass från vald nivå
4. Placering av förklaringar och stödtexter
5. UI-förbättring av hela flödet

## Vad vi inte bör göra direkt

Följande delar bör vänta tills grunden sitter:

- kopiera referensens layout
- låta statistik eller påminnelser styra informationsarkitekturen
- visa alla förklaringar på startsidan
- göra appen texttung som referensen

## Kort produktrekommendation

Den bästa riktningen är:

- behåll nuvarande app som snabb och enkel i grunden
- använd referensbilderna för att bygga bättre programlogik och övningsprogression
- förbättra UI:t utifrån våra egna behov, inte referensens layout
- se till att förklaringarna alltid finns tillgängliga, men på rätt plats i flödet

På så sätt får vi en app som känns enkel på iPhone, men som hjälper användaren tydligare från `välj övning` till `förstå vad du gör` till `genomför passet`.
