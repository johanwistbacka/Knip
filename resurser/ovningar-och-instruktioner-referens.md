# Övningar och instruktioner – referens för komplettering av Knip

Sammanställt 2026-09-17 från samtliga 18 skärmbilder i denna mapp. Appstatus är avstämd mot `app.js` och `index.html` samma datum (cache/appversion v23).

**Senare implementation:** Appstatus och öppna frågor nedan är den historiska inventeringen av v23. Prioritet 1–3 har därefter implementerats till och med v27. Godkända beslut om avancerad progression, fritt nivåval, rörelseguidning och passlängd samt aktuella testresultat finns i [todo.md, prioritet 3](../todo.md). Källcitat och referensens blockföljder nedan är oförändrade.

## Syfte och läsanvisning

Dokumentet samlar grundövningar, avancerade övningar och stödtexter så att innehåll som saknas i Knip kan implementeras utan att skärmbilderna behöver tolkas på nytt.

- **Referensinnehåll:** vad som syns i skärmbilderna. Blockcitat återger källtext med normaliserade radbrytningar och viss typografi. Tabeller och punktlistor strukturerar samma innehåll.
- **Appstatus:** vad som finns i den granskade lokala appkoden. Detta är en daterad kodinventering, inte ett nytt funktionstest.
- **Öppna frågor och implementationsförslag:** sådant som bilderna inte avgör. Dessa är inte fattade produktbeslut.

Referenstexterna är underlag, inte färdig gränssnittstext eller en medicinskt validerad specifikation. Bevara övningarnas avsedda innehåll men formulera appens texter självständigt. Dokumentet ersätter inte beslutade regler i [Lokal träningsdata och progression](lokal-traningsdata-och-progression.md) eller [Hoppa över nivå](hoppa-over-niva.md).

## 1. Källregister

Alla bilder är tagna 2026-06-30. Källnumren används i resten av dokumentet. Vissa bilder är beskurna; osynlig text har inte fyllts i som säker källtext.

| Källa | Bild | Innehåll |
| --- | --- | --- |
| B01 | [21.33.27](<Skärmavbild 2026-06-30 kl. 21.33.27.png>) | Övning 1 |
| B02 | [21.33.34](<Skärmavbild 2026-06-30 kl. 21.33.34.png>) | Övning 2 |
| B03 | [21.33.41](<Skärmavbild 2026-06-30 kl. 21.33.41.png>) | Övning 3 |
| B04 | [21.33.48](<Skärmavbild 2026-06-30 kl. 21.33.48.png>) | Övning 4 |
| B05 | [21.33.55](<Skärmavbild 2026-06-30 kl. 21.33.55.png>) | Övning 5 |
| B06 | [21.34.02](<Skärmavbild 2026-06-30 kl. 21.34.02.png>) | Övning 6 och vardagstips |
| B07 | [21.34.08](<Skärmavbild 2026-06-30 kl. 21.34.08.png>) | Avancerad 1 |
| B08 | [21.34.12](<Skärmavbild 2026-06-30 kl. 21.34.12.png>) | Avancerad 2 |
| B09 | [21.34.19](<Skärmavbild 2026-06-30 kl. 21.34.19.png>) | Avancerad 3, lyft |
| B10 | [21.34.23](<Skärmavbild 2026-06-30 kl. 21.34.23.png>) | Avancerad 4, gång |
| B11 | [21.34.29](<Skärmavbild 2026-06-30 kl. 21.34.29.png>) | Avancerad 5, hosta |
| B12 | [21.34.34](<Skärmavbild 2026-06-30 kl. 21.34.34.png>) | Avancerad 6, kombinerade moment |
| B13 | [21.34.43](<Skärmavbild 2026-06-30 kl. 21.34.43.png>) | Prova knipen, fyra kniptyper |
| B14 | [21.34.52](<Skärmavbild 2026-06-30 kl. 21.34.52.png>) | Beskuren instruktion om att hitta knipet |
| B15 | [21.34.57](<Skärmavbild 2026-06-30 kl. 21.34.57.png>) | Tips om träningen |
| B16 | [21.35.01](<Skärmavbild 2026-06-30 kl. 21.35.01.png>) | Statistik, kalender |
| B17 | [21.35.05](<Skärmavbild 2026-06-30 kl. 21.35.05.png>) | Påminnelser och personligt mål |
| B18 | [21.35.26](<Skärmavbild 2026-06-30 kl. 21.35.26.png>) | Träningsupplägg, träningstid och underhåll |

## 2. De fyra kniptyperna

Källa: B13. Samma typinstruktioner återkommer vid övningarna i B01–B12.

| Referensnamn | Appens namn | Befintlig typnyckel |
| --- | --- | --- |
| Hitta-rätt-knip | Känn in | `find` |
| Styrkeknip | Stadiga knip | `strength` |
| Uthållighetsknip | Håll kvar | `endurance` |
| Snabba knip | Korta pulser | `quick` |

### Hitta-rätt-knip

> Knip ihop runt ändtarmsöppning och urinrör med liten kraft.

Appens nuvarande instruktion: ”Börja med ett lätt knip och känn rörelsen inåt och uppåt.”

### Styrkeknip

> Knip ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt med så stor kraft du kan.

Appens nuvarande instruktion: ”Gör ett tydligt knip, fokusera på rörelsen inåt och uppåt och släpp sedan helt.”

Skillnad: referensens uttryckliga maximala kraft finns inte i appens formulering.

### Uthållighetsknip

> Knip ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt – men du behöver inte ta i maximalt.

Appens nuvarande instruktion: ”Håll ett jämnt knip inåt och uppåt utan att spänna mer än du behöver.”

### Snabba knip

> Knip snabbt ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt så kraftigt du kan.

Appens nuvarande instruktion: ”Gör snabba, tydliga knip med full avslappning mellan varje.”

Skillnad: referensens kraftangivelse är förenklad. Appen betonar i stället avslappning mellan repetitionerna.

### Presentation och tidsuppgifter

Referensens ”Prova knipen” visar de fyra typerna i ordningen ovan, med ikon och förklaring. Ikonerna föreställer förstoringsglas, spänd arm, timglas respektive blixt. Bilderna visar inte vad ett tryck på en typ gör; ett separat provpass kan inte förutsättas utifrån bilden.

De granskade bilderna anger **inte** exakta knip- eller vilotider för Hitta-rätt-knip, Styrkeknip eller Snabba knip. Endast uthållighetstiderna anges numeriskt i programmen. Förberedelse, blockpauser och vila efter sista knipet framgår inte heller.

I appen har alla typer utan explicit `durationSeconds` samma inställda kniptid. Standard är 5 sekunder knip och 5 sekunder vila, med 5 sekunders förberedelse. Det gäller alltså även Korta pulser. Detta behöver ett separat tidsbeslut; exempelvis 1 sekund får inte anges som om det kom från bilderna.

## 3. Grundprogrammet: Övning 1–6

Ordningen nedan är ordningen inom ett pass. Antalet i ett block är antal knip, inte antal pass. Varje förekommande typ använder grundinstruktionen i avsnitt 2.

| Källa och nivå | Block i ordning | Kroppsläge enligt referensen | Pass per dag | Period före nästa nivå |
| --- | --- | --- | --- | --- |
| B01, Övning 1 | 8 Hitta-rätt-knip | Enklast liggande på rygg, mage eller sida; alternativt sittande eller stående | 3 | 3 dagar |
| B02, Övning 2 | 6 Hitta-rätt-knip → 2 Styrkeknip | Enklast liggande på rygg, mage eller sida; alternativt sittande eller stående | 3 | 3 dagar |
| B03, Övning 3 | 5 Hitta-rätt-knip → 5 Styrkeknip | Liggande, sittande eller stående | 3 | 3 dagar |
| B04, Övning 4 | 8 Styrkeknip → 1 Uthållighetsknip, 15 sekunder | Sittande eller stående | 3 | 1–2 veckor |
| B05, Övning 5 | 10 Styrkeknip → 1 Uthållighetsknip, 25 sekunder | Stående | 3 | 1–2 veckor |
| B06, Övning 6 | 10 Styrkeknip → 1 Uthållighetsknip, 35 sekunder → 5 Snabba knip | Stående | 3 | 1–2 veckor till avancerade övningar, eller fortsätt till totalt tre månaders träning |

### Återkommande instruktion om nivåbyte

B01–B03:

> Gör övningen tre gånger om dagen. Byt till nästa övning när du klarat den i tre dagar.

B04–B05:

> Gör övningen tre gånger om dagen. Byt till nästa övning när du klarat den i 1–2 veckor.

### Övning 6: fortsättning och vardag

B06:

> Gör övningen tre gånger om dagen. Byt till Avancerade övningar när du klarat övningen i 1–2 veckor eller fortsätt med denna övning till total träningstid tre månader.

> Använd knipet i vardagslivet också: snabbt knip innan hosta, styrkeknip vid lyft och uthållighetsknip vid några tillfällen när du går.

### Appstatus för grundprogrammet

Alla sex nivåer finns i `EXERCISE_LEVELS` som `exercise-1` till `exercise-6`, med visningsnamnen Steg 1–6. Blockordning, repetitionsantal och explicita uthållighetstider överensstämmer med bilderna. Kroppsläge, tre pass per dag och föreslagna perioder visas i programvyn.

Detaljerna rygg/mage/sida är förenklade till ”liggande”. Vardagstipsen på Övning 6 och möjligheten att fortsätta till avancerade övningar saknas. Appen anger fortsatt träning till tre månader, men har inget särskilt underhållsprogram.

## 4. Avancerat program: Avancerad 1–6

**Appstatus:** samtliga sex avancerade program saknas. Nedan är referensinnehåll, inte implementerade nivåer. Alla använder typinstruktionerna i avsnitt 2, kompletterade med momenten nedan.

### Avancerad 1

Källa: B07.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 35 sekunder.
3. 10 Styrkeknip.
4. 5 Snabba knip.

Summeringen överst i bilden är 20 Styrkeknip, 1 Uthållighetsknip och 5 Snabba knip. De två styrkeblocken ska behållas åtskilda i passets ordning.

> Träna i stående.

> Gör övningen tre gånger om dagen. Byt till nästa övning när du klarat den i 1–2 veckor.

### Avancerad 2

Källa: B08.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 35 sekunder.
3. 10 Styrkeknip.
4. 10 Snabba knip.

Summering: 20 Styrkeknip, 1 Uthållighetsknip och 10 Snabba knip.

> Träna i stående.

> Gör övningen tre gånger om dagen. Byt till nästa övning när du klarat den i 1–2 veckor.

### Avancerad 3 – lyft

Källa: B09.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 45 sekunder.

> Träna knip i samband med lyft.

> Stå med fötterna isär och tårna pekande lätt utåt. Knip styrkeknip. Böj i knän och höfter så att du når med händerna strax nedom knäna (som om du skulle lyfta två matkassar). Sedan reser du dig upp och släpper knipet först då du står rakt.

> Gör övningen stående, tre gånger om dagen i 1–2 veckor.

Lyftrörelsen beskrivs tillsammans med styrkeknipet. Ingen särskild rörelseinstruktion för uthållighetsblocket anges här. Bilden anger inte separat antal sekunder för lyftets olika delar.

### Avancerad 4 – gång

Källa: B10.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 45 sekunder.

> Träna uthållighetsknip i samband med gång.

> Knip ett vanligt uthållighetsknip och gå runt i rummet. När du nästan knipit klart så stannar du och står stilla innan du släpper knipet. Du ska då känna att bäckenbotten ”sänks” något.

> Gör övningen stående, tre gånger om dagen i 1–2 veckor.

Instruktionen att stanna före avslappning behöver kunna förmedlas nära slutet av uthållighetsblocket om ett guidat pass införs. Exakt tidpunkt framgår inte av bilden.

### Avancerad 5 – hosta

Källa: B11.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 60 sekunder.
3. 10 Styrkeknip.
4. 10 Snabba knip.

Summering: 20 Styrkeknip, 1 Uthållighetsknip och 10 Snabba knip.

> Träna på att lyfta upp bäckenbotten i samband med hosta.

> Du gör vanliga snabba knip. När du håller knipet på högsta nivå hostar du kraftfullt en gång. Släpp därefter knipet. Vila och upprepa.

> Gör övningen stående, två gånger om dagen i 1–2 veckor.

Notera minskningen från tre till **två pass per dag**. Hostmomentet är kopplat till snabba knip, inte till varje kniptyp.

### Avancerad 6 – kombinerat program

Källa: B12.

1. 10 Styrkeknip.
2. 1 Uthållighetsknip i 60 sekunder.
3. 10 Styrkeknip.
4. 10 Snabba knip.
5. 10 Styrkeknip.
6. 1 Uthållighetsknip i 60 sekunder.
7. 10 Styrkeknip.
8. 10 Snabba knip.

Summering: **40 Styrkeknip, 2 Uthållighetsknip à 60 sekunder och 20 Snabba knip**. Sekvensen motsvarar två omgångar av Avancerad 5:s blockföljd, men rörelseinstruktionerna är annorlunda.

> Extremt avancerad övning som kräver både styrka, uthållighet och koncentration. Mycket få personer kan göra hela övningen. Gör knäböjning/lyftrörelse på vartannat styrkeknip, gå runt i rummet under uthållighetsknipet och hoststöt på vartannat snabbt knip.

> Gör övningen stående, 2 gånger om dagen i 1–2 veckor.

”Vartannat” anger inte om första eller andra repetitionen ska ha rörelsemomentet. Bilden fastställer inte heller om alterneringen ska räknas om vid varje block. Detta behöver avgöras om appen ska guida varje repetition. Ingen nästa nivå eller särskild avslutsregel visas.

### Samlad kontrolltabell för avancerade program

| Nivå | Styrkeknip totalt | Uthållighetsknip | Snabba knip totalt | Läge/moment | Pass per dag | Period |
| --- | --- | --- | --- | --- | --- | --- |
| Avancerad 1 | 20 | 1 × 35 sek | 5 | Stående | 3 | 1–2 veckor |
| Avancerad 2 | 20 | 1 × 35 sek | 10 | Stående | 3 | 1–2 veckor |
| Avancerad 3 | 10 | 1 × 45 sek | 0 | Stående, lyftrörelse | 3 | 1–2 veckor |
| Avancerad 4 | 10 | 1 × 45 sek | 0 | Stående, gång under uthållighet | 3 | 1–2 veckor |
| Avancerad 5 | 20 | 1 × 60 sek | 10 | Stående, hosta under snabba knip | 2 | 1–2 veckor |
| Avancerad 6 | 40 | 2 × 60 sek | 20 | Stående, lyft/gång/hosta | 2 | 1–2 veckor |

Totaler ersätter inte blockordningen. Lägre antal knip i Avancerad 3–4 betyder inte automatiskt lägre svårighetsgrad; dessa nivåer inför rörelsemoment. Bilderna klassificerar inte passen som korta, normala eller långa.

## 5. Hitta rätt knip och tips om träningen

### Beskuren instruktion om att hitta knipet

Källa: B14. Text är avskuren vid både vänster- och högerkant. Följande är en sammanfattning av det läsbara innehållet, inte en fullständig ordagrann transkription:

- Föreställ dig ett blixtlås som stängs bakifrån och framåt.
- När du slappnar av glider blixtlåset upp.
- Knipet beskrivs som en stängning, dragning och ett lyft inuti underlivet mot naveln.
- Pungen lyfts uppåt och basen av penis dras inåt.
- Texten nämner också sammandragning runt ändtarmsöppningen och ett lyft uppåt, men slutet av meningen kan inte återges säkert på grund av beskärningen.
- Därefter syns rubriken ”Tips om du har svårt att hitta knipet”, med beskuren första bokstav. Inget efterföljande innehåll syns i just denna bild.

### Olika kroppslägen

Källa: B15, ”Tips om träningen”.

> Det kan vara lättare att ”hitta rätt muskler” i olika kroppslägen. Du kan prova att ligga på rygg, sida eller mage med benen i olika lägen. Du kan sitta eller stå. När du står kan du testa att låta tårna peka utåt eller inåt. När du sitter kan du testa att sitta framåtlutad med armbågarna på knäna.

### Skapa tankebilder

Källa: B15.

> Föreställ dig att du ska förhindra att gaser går så att du måste knipa runt ändtarmen, du ska då känna att muskeln kring ändtarmsöppningen rör sig. Föreställ dig nu att du ska dra penis in i din kropp så att den förkortas och samtidigt lyfta pungen mot naveln.

### Känn efter

Källa: B15.

> Ställ dig framför spegeln (utan kläder), knip och lyft bäckenbotten. Du ska nu känna hur pungen lyfts uppåt och se hur basen av penis dras inåt. Magen och låren ska inte spännas. Du kan också lägga några fingrar mellan ändtarmsöppning och pung och känna att detta parti lyfts en liten bit när du kniper.

### Känsligt test

Källa: B15. Hela begränsningen i källan återges tillsammans med testbeskrivningen.

> Prova att knipa av urinstrålen när du kissar. Det kan vara svårt i början när strålen är som starkast men försök efter några sekunder. Kan du få strålen att minska eller avbrytas? I så fall använder du rätt muskler. Blåsans reflexer är känsliga så gör inte detta regelbundet – bara som ett test.

Detta är en dokumenterad källinstruktion, inte ett vanligt träningsblock. Om innehållet förs in i appen behöver formulering och lämplighet granskas; begränsningen får inte försvinna.

### Andra muskler

Källa: B15.

> Magmuskler, skinkmuskler och lårmuskler ska vara stilla när du kniper.

### Appstatus och innehållsgränser

Appen har korta typinstruktioner och kroppsläge per nivå, men saknar ovanstående fördjupade hjälp. Referensen är här uttryckligen anpassad till manlig anatomi. Att göra en anatomiskt bredare version kräver kompletterande innehåll, inte enbart namnbyte.

Någon tydlig instruktion om andning eller råd om smärta och när träning bör avbrytas syns inte i dessa bilder. Sådana tillägg ska markeras som nytt innehåll, inte tillskrivas referensen.

## 6. Hur, hur länge och hur ofta ska man träna?

Källa för hela avsnittet: B18.

### Hur ska jag träna?

> Välj övning. När du klarat att göra en hel övning tre gånger per dag i tre dagar, går du vidare till nästa övning.

> När du kommit till övning 4 ökar du också längden på träningsperioden – från och med övning 4 gör du övningen tre gånger per dag, men i 1–2 veckor istället för tre dagar.

Den generella texten anger tre gånger per dag. De specifika bilderna för Avancerad 5–6 anger däremot två gånger per dag. Bevara denna skillnad per nivå; använd inte den generella formuleringen för att skriva över nivåernas egna uppgifter.

### Hur länge ska jag träna?

> Alla tar sig inte igenom alla övningar, och det är heller inte nödvändigt för att få resultat. Fortsätt att träna på den övning du precis klarar. Det viktigaste är att du tränar regelbundet.

> Efter 4–6 veckors träning bör du känna att du kan kontrollera ”knipet” bättre, att det är lite starkare och att du kan hålla det lite längre. Efter tre månaders daglig träning bör du känna en tydlig förbättring när det gäller styrkan i knipet och hur länge du kan hålla det. Om du haft urinläckage i samband med ansträngning kan besvären ha minskat.

Tidsangivelser och effektbeskrivningar ovan återger referensens påståenden; de är inte verifierade individuella utfall eller ett löfte från Knip.

### Underhållsträning

> Om du tränat tre gånger per dag i tre månader och tycker att du blivit tillräckligt bra, kan du prova att minska på träningen. Du kan då fortfarande träna tre gånger per dag, men minska till att göra det två till tre dagar i veckan. Välj då en nivå på övningen som du tycker är lagom utmanande och som innehåller flera olika typer av knip.

> Tänk också på att använda alla knipen i vardagen. Du kan till exempel använda snabbt knip vid hosta, styrkeknip vid lyft och ett uthållighetsknip på 15–60 sekunder vid några tillfällen under en promenad. Till slut blir det en vana som du gör automatiskt.

> Om du tränat tre gånger per dag i tre månader och har blivit bättre men inte tillräckligt bra, kan du fortsätta att träna tre gånger per dag i tre månader till.

### Appstatus och skillnad mot beslutad progression

Appen visar tre pass per dag som rekommendation och föreslagna perioder per grundnivå. Den faktiska kvalificeringen är minst ett komplett pass på aktiv nivå per lokal kalenderdag under tre dagar i rad. Nivåbyte är frivilligt.

Vid byte genomför appen tre passdelar i samma pass: dag 1 en ny och två gamla, dag 2 två nya och en gammal, dag 3 tre nya. Detta är projektets egen modell, inte något som visas i bilderna. Den ska inte ändras indirekt när referensinnehåll kompletteras.

Längre råd om förväntad utveckling, underhåll två till tre dagar per vecka, ytterligare tre månaders träning och vardagsträning saknas i appen. Hur ett framtida underhållsläge ska samverka med kravet på tre dagar i rad är inte beslutat.

## 7. Statistik, mål och påminnelser i referensen

Detta är kompletterande innehåll från de två återstående bilderna, utanför själva övningsprogrammen.

### Statistik

Källa: B16.

- Flikar för Statistik och Påminnelser.
- Månadskalender för juni 2026 med veckodagar måndag–söndag.
- Pilar för föregående och nästa månad.
- Den 30 juni är markerad med blå bakgrund.
- Bilden visar inte om markeringen betyder dagens datum, valt datum eller genomförd träning. Det går inte att fastställa detaljvy, färgkodning eller statistikberäkning utifrån bilden.

Appen har antal genomförda pass totalt, senaste sju dagarna och senaste passet samt JSON-export. Kalender saknas.

### Personligt mål för träning

Källa: B17.

> Här kan du ställa in ditt mål för träning. Stjärnan på startsidan visar hur du uppfyllt ditt träningsmål under de senaste 7 dagarna.

En av/på-kontroll syns bredvid rubriken. Bilden visar inte målets möjliga värden, beräkningsregel eller själva stjärnan. Appen saknar motsvarande personligt mål och stjärnvisning.

### Påminnelser

Källa: B17. Förklaringen är beskuren vid kanterna; följande sammanfattar det läsbara innehållet:

- Påminnelser om träning kan aktiveras och kräver tillåtelse för pushnotiser i referensappen.
- Användaren kan välja klockslag och text som ska visas.
- Texten beskriver valfritt antal påminnelser per dygn och val av veckodagar.
- Vibration och/eller ljud kan användas; alternativen hanteras i telefonens egna inställningar enligt referensen.
- Tre påminnelserader med tiden 12:00 syns, den sista bara delvis. De fullständiga raderna visar ”Tät® påminnelse”, ”Varje dag” och en av/på-kontroll.

Tre synliga rader är ett skärmexempel, inte ett belagt maxantal eller beslutade standardtider. Snooze visas inte i bilden. Appen har inga påminnelser; referensens notisfunktion visar inte vad som är tekniskt möjligt i vår iPhone-PWA.

## 8. Samlad lista över kompletteringar

Status gäller 2026-09-17. Listan beskriver skillnader mot referensen; den innebär inte att alla funktioner ska införas samtidigt.

| Område | Finns idag | Saknas eller behöver preciseras | Källor |
| --- | --- | --- | --- |
| Grundprogram | Sex nivåer, korrekt blockordning och antal | Ingen ändring av blockantal behövs | B01–B06 |
| Typinstruktioner | Fyra korta instruktioner | Anatomisk precision och skillnad i kraftnivå är förenklade | B13 |
| Snabba knip | Typ, text och fem repetitioner i Steg 6 | Egen snabb timing; exakta tider saknas i källorna | B06, B13 |
| Kroppslägen | Grundläggande läge per nivå | Rygg/mage/sida, ben- och fotvariationer, sittande framåtlutad | B01–B03, B15 |
| Hitta rätt | Kort beskrivning av lätt knip | Tankebilder, spegel/beröring och hjälp att identifiera muskler | B14–B15 |
| Andra muskler | Viss allmän text om avslappning | Uttryckliga råd om mage, skinkor och lår | B15 |
| Hjälpöversikt | Instruktioner inne i stegen | Samlad motsvarighet till Prova knipen och Tips om träningen | B13–B15 |
| Vardagstips | Saknas | Lyft, gång och hosta | B06, B09–B12, B18 |
| Avancerade program | Saknas | Alla sex nivåer, blockföljder, tider, frekvenser och rörelsemoment | B07–B12 |
| Fortsättning efter Steg 6 | Råd om tre månader | Val att gå vidare till avancerat program | B06 |
| Långsiktiga råd | Kort råd om tre månader | Regelbundenhet, lämplig egen nivå, utveckling och underhåll | B18 |
| Progression | Projektets egen kvalificering och övergång | Beslut om hur avancerade nivåer och underhåll ska ansluta | B06–B12, B18 |
| Statistik | Grundstatistik och export | Månadskalender | B16 |
| Mål | Kvalificeringsföljd per nivå | Personligt sjudagarsmål och återkoppling | B17 |
| Påminnelser | Saknas | Tider, text, veckodagar och aktivering, efter plattformsutredning | B17 |

## 9. Öppna frågor inför implementation

1. **Tider per kniptyp:** hur långa ska hitta-rätt-, styrke- och snabba knip vara, och hur långa ska vilorna vara? Bilderna anger endast uthållighetstiderna.
2. **Avancerad progression:** hur ansluter Avancerad 1 efter Steg 6, och ska samma tredagarskvalificering och mjuka övergång användas? Bildernas 1–2 veckor är källinformation, inte ett beslut om appens nya regler.
3. **Passlängd:** vilka gränser ska skilja kort, normalt och långt pass? Totaltider kan först fastställas när knip-, vilo- och rörelsetider är bestämda.
4. **Kortare alternativ och nivåhopp:** vilka avancerade pass får hoppas över eller kortas, och vad händer med progressionen? Referensbilderna visar inga sådana regler.
5. **Rörelseanvisningar under pass:** ska appen bara visa instruktionen före start eller även guida lyft, gång, stopp och hosta under rätt repetition? Tidpunkter och signaler måste i så fall definieras.
6. **Vartannat knip i Avancerad 6:** första eller andra repetitionen, och omstart per block? Ingen sådan detaljregel framgår.
7. **Underhållsträning:** hur väljs nivå, veckodagar och dagsmål, och hur hanteras detta separat från progressionens dagar i rad?
8. **Instruktionernas målgrupp och formulering:** ska den manliga anatomin behållas? Kraftangivelser, testet av urinstrålen och effektpåståenden behöver bedömas innan de blir apptext.
9. **Nytt stöd utöver bilderna:** råd om andning, smärta och när användaren bör söka hjälp kräver annat underlag. De saknas i det granskade bildmaterialet.
10. **Mål och påminnelser:** målberäkning, tillåtna inställningar, snooze och tekniskt stöd i iPhone-PWA behöver specificeras separat.

## 10. Förslag på avgränsad implementationsordning

Detta är ett arbetsförslag, inte ett nytt produktbeslut.

1. Komplettera hjälpinnehållet och tydliggör kniptyperna. Avgör snabba knips timing innan de beskrivs som korrekt guidade av timern.
2. Modellera de avancerade passen med ordnade block, separata totaler, kroppsläge, instruktioner, frekvens och period. Rörelsemoment behöver kunna knytas till rätt typ/block/repetition.
3. Bestäm anslutningen efter Steg 6, kvalificering, övergång, nivåhopp och eventuella kortare pass innan de avancerade nivåerna aktiveras.
4. Lägg till långsiktiga råd och eventuellt underhållsläge efter beslut om hur de ska samverka med historik och progression.
5. Hantera kalender, personliga mål och påminnelser som separata funktioner.

### Kontrollpunkter när innehållet implementeras

- Grundprogrammets befintliga repetitionsantal och uthållighetstider bevaras.
- Avancerad 1–2 och 5 behåller två separata styrkeblock; Avancerad 6 behåller alla åtta block i rätt ordning.
- Avancerad 5–6 visar två pass per dag; övriga avancerade nivåer visar tre.
- Lyft hör till styrkeknip, gång till uthållighetsknip och hosta till snabba knip.
- Avancerad 6 skiljer på vartannat knip och varje knip.
- Korta pulser får en uttryckligen beslutad tidsmodell, utan att den påstås vara avläst ur bilderna.
- Referensens rekommenderade period och appens faktiska villkor för nivåbyte visas som olika saker.
- Befintlig historik, aktiv nivå, nivåhopp och pågående övergång förblir läsbara när programmet utökas.
- Testet av urinstrålen görs inte till ett repetitionspass och tappar inte källans begränsning.
- Beskuren eller osynlig källtext presenteras inte som säkert avläst.
- Nya apptexter skrivs med eget språk; källcitat finns kvar i detta dokument för spårbarhet.

## 11. Relaterade projektdokument

- [Övningsprogram 1–6 och progression](ovningsprogram-1-6-och-progression.md): tidigare analys av grundprogrammet. Dess öppna fråga om extraktion av Avancerad 3–6 besvaras av avsnitt 4 här, men produktfrågorna kvarstår.
- [Referensanalys och utvecklingsplan](referensanalys-och-utvecklingsplan.md): tidigare innehålls- och UI-analys; flera då föreslagna funktioner är nu implementerade.
- [Lokal träningsdata och progression](lokal-traningsdata-och-progression.md): projektets regler för historik, kvalificering och övergång.
- [Hoppa över nivå](hoppa-over-niva.md): regler för nivåhopp och återaktivering.
- [Utvecklingsidéer](utvecklingsideer.md): idéer, inte fullständig aktuell implementationsstatus.
- [Todo](../todo.md): arbetslista och tidigare verifieringar.

Endast detta referensdokument skapades vid sammanställningen. Appkod, cache, träningsdata och befintliga produktbeslut ändrades inte.
