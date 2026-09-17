# Todo för Knip

Den här listan är vår startpunkt för fortsatt utveckling. Genomgången 2026-09-17 stämmer av punkterna mot aktuell kod och produktunderlag. Avbockat betyder implementerat eller dokumenterat enligt punkten; fysisk iPhone-verifiering redovisas separat. Förbättringsförslagen längst ned är förslag, inte nya produktbeslut.

## Innan vi börjar koda

- [ ] Sammanställ exakt innehåll för `Avancerad 1-6` från referensbilderna.
- [ ] Märk varje pass som `kort`, `normal` eller `lång`.
- [x] Bestäm regler för att hoppa över grundprogrammets nivåer: alla utom sista tillgängliga nivån kan hoppas över och senare återaktiveras.
- [ ] Bestäm vilka avancerade långa pass användaren får hoppa över.
- [x] Fastställ progressionen genom `Övning 1-6`.
- [ ] Fastställ fortsättningen från `Övning 6` till avancerade repetitionspass.
- [x] Bestäm om nivåbyte kräver antal dagar, antal genomförda pass eller båda: minst ett komplett pass per lokal kalenderdag under tre dagar i rad, följt av ett frivilligt nivåbyte.
- [x] Fastställ den mjuka övergången som tre passdelar i ett sammanhängande träningspass:
  - dag 1: `1 ny + 2 gamla passdelar`
  - dag 2: `2 nya + 1 gammal passdel`
  - dag 3: `3 nya passdelar`
- [x] Bestäm vad som händer efter missade dagar eller ett längre uppehåll: kvalificeringsföljden bryts, påbörjad övergång pausas och aktiv nivå behålls.
- [x] Bygg grundflöden för start, dagens pass, nivåbyte och avslutat pass.
- [ ] Komplettera första starten med en kort introduktion till träningen och progressionen.
- [x] Bestäm grundljud: startsignal, ett ljud per knipsekund, tyst vila och avslutssignal.
- [ ] Ta ställning till särskild ljudsignal vid byte av kniptyp; samma knipsignal används för alla typer idag.
- [x] Lägg till ljud på/av, volym och tyst läge.
- [ ] Ta ställning till valbara ljud; idag finns en fast ljuduppsättning.
- [ ] Definiera påminnelser, tider och snoozeval.
- [ ] Kontrollera vad iPhone-PWA stödjer för notiser och snooze.
- [x] Inför grundläggande progression och en följd av kvalificerande träningsdagar per nivå.
- [ ] Välj om veckomål och nivåbelöningar ska ingå i första versionen.
- [x] Visa grundstatistik: totalt genomförda pass, senaste sju dagarna och senaste passet samt aktiv nivå och kvalificeringsföljd på startsidan.
- [ ] Bestäm utökad historik och dagsstatus, exempelvis dagens genomförda pass i förhållande till rekommendationen.
- [x] Skriv korta instruktioner för de fyra kniptyperna och kroppsläge per nivå.
- [ ] Komplettera med nödvändig säkerhetsinformation och råd om andning och avslappning.
- [x] Ange acceptanskriterier för lokal träningsdata och progression i separat specifikation.
- [ ] Ange samlade acceptanskriterier för första versionen, inklusive iPhone, offline, ljud och tillgänglighet.

## Första implementationen

- [x] Gör träningsprogrammen datadrivna.
- [x] Bygg programflödet för `Övning 1-6`.
- [x] Spara aktiv nivå, nivådagar och genomförda pass.
- [x] Implementera den mjuka övergången mellan nivåer.
- [x] Lägg till ljud för skärmfri träning.
- [ ] Lägg till val för kortare pass och möjlighet att hoppa över långa pass.
- [x] Bygg avslutsskärm med passammanfattning och progression.
- [ ] Lägg till snoozbara påminnelser utifrån verifierat plattformsstöd.
- [x] Lägg till grundläggande motivationsstöd genom nivåprogression och kvalificeringsföljd.
- [ ] Implementera eventuella veckomål och nivåbelöningar efter produktbeslut.
- [ ] Testa hela flödet på mobil och som installerad PWA.

## Åtgärder efter webbläsartest 2026-09-17

- [x] Höj `CACHE_NAME` i `service-worker.js` från `knip-cache-v8` till nästa version så att aktuell `index.html`, `app.js` och övriga statiska filer installeras som en sammanhängande cache.
- [x] Verifiera uppdateringsflödet på rotadressen utan cachebrytande frågeparameter och kontrollera att inga JavaScriptfel uppstår vid ljudkontrollerna.
- [x] Testa ljud tillsammans med podcast på fysisk iPhone: användaren rapporterar att ljudet fortfarande är för lågt, se ljudåtgärder nedan.
- [ ] Testa vibrationsfeedback på en fysisk iPhone.
- [x] Bekräfta offline-funktion på fysisk iPhone enligt användarens test.
- [ ] Bekräfta installation på hemskärmen, start i fristående PWA-läge och kallstart utan nät på en fysisk iPhone; dessa detaljer framgår inte av offline-rapporten.
- [x] Spela ett kort ljud varje sekund under knip och håll viloperioden tyst.
- [x] Låt ljudet slås på och av direkt under ett pågående pass.
- [x] Ge progressindikatorn mer avstånd till passkontrollerna och använd hela skärmbredden på telefon.

Verifierat 2026-09-17 i isolerad lokal Chrome (headless): vanlig omladdning av `/` installerade v9 över v8 utan frågeparameter eller rensning av cache under uppdateringen. Efter aktivering och ytterligare vanlig omladdning matchade alla åtta cacheposter aktuella projektfiler, v8 var borttagen och localStorage var oförändrad. `Testa ljudet` fungerade med ljudvalet både på och av; ljudvalet sparades, pass var tysta med ljud av och skapade start- och fassignaler med ljud på. Paus, fortsätt, avbryt samt offline-omladdning och ljudtest fungerade utan JavaScriptundantag eller konsolfel. Ljudets hörbarhet och fysisk iPhone/PWA är inte verifierade här.

Verifierat 2026-09-17 i isolerad lokal Chrome med 390 × 844 px mobilvy: panelen använde hela skärmbredden utan yttre kortkant eller skugga och avståndet mellan progresslinjen och paus/fortsätt-knappen var 96 px. Ett ljud skapades för var och en av fem knipsekunder, inga ljud skapades under fem sekunders vila och ljud gick att slå av och på under både knip och vila. Inställningen sparades och testet gav inga JavaScriptundantag eller konsolfel. Cache v10 installerades. Hörbarhet på fysisk iPhone är inte verifierad här.

## Senare

- [ ] Bygg avancerade repetitionspass.
- [ ] Lägg till kalender eller veckovy.
- [ ] Lägg till fler milstolpar och belöningar.
- [ ] Anpassa påminnelser efter träningsvanor.
- [ ] Utvärdera fler program och personliga mål.

## Underlag

- [Utvecklingsidéer](resurser/utvecklingsideer.md)
- [Övningsprogram 1-6 och progression](resurser/ovningsprogram-1-6-och-progression.md)
- [Referensanalys och utvecklingsplan](resurser/referensanalys-och-utvecklingsplan.md)

## Lokal träningsdata och mjuk progression

- [x] Spara komplett träningshistorik lokalt med versionshanterat dataformat.
- [x] Lägg till användarstyrd export av träningshistoriken som JSON.
- [x] Räkna progression på tre lokala kalenderdagar i rad, inte tre utspridda träningsdagar.
- [x] Visa följden som exempelvis `2 av 3 dagar i rad` och låt användaren själv välja när övergången startar.
- [x] Implementera övergången: 1 ny + 2 gamla, 2 nya + 1 gammal, därefter endast den nya övningen.
- [x] Låt en missad dag pausa en påbörjad övergång, men återställa kvalificeringsföljden innan övergången.
- [x] Testa flera pass samma dag, avbrutna pass, missade dagar och byte av lokal dag/tidszon.

Se [specifikationen för lokal träningsdata och progression](resurser/lokal-traningsdata-och-progression.md).

# Hoppa över nivå

- [x] Lägg till åtgärden `Hoppa över nivå` i programvyn med bekräftelse.
- [x] Markera nivån som `skipped`; räkna den inte som genomförd och ge ingen träningsdag eller svit.
- [x] Gå vidare till nästa tillgängliga nivå och hoppa över redan överhoppade nivåer.
- [x] Använd inte en överhoppad nivå som gammal övning i en mjuk övergång.
- [x] Avbryt en pågående övergång om användaren hoppar över nivån.
- [x] Spara nivåhopp och återaktivering som separata programhändelser.
- [x] Låt användaren återaktivera en överhoppad nivå senare.
- [x] Dölj eller inaktivera nivåhopp på sista nivån när ingen senare nivå finns.

Verifierat 2026-09-17 i isolerad lokal Chrome (headless) med 390 × 844 px mobilvy: bekräftelse och avbruten bekräftelse för nivåhopp och återaktivering, flera överhoppade nivåer, avbruten övergång, övergång utan överhoppade övningsblock, spärr på sista nivån, oförändrad träningshistorik samt sparning efter omladdning. Äldre programdata (schema 1) lästes in med bibehållen övergång. Fokus flyttades till det aktiva steget; snabbstart, paus, fortsätt och avbryt fungerade. Cache v15 och offline-omladdning verifierades utan JavaScriptundantag eller konsolfel. Fysisk iPhone är inte verifierad.

## Ljud och skärmlås

- [x] Lägg till en sparad volymkontroll i inställningarna och under pågående pass.
- [x] Dölj volymkontrollen i inställningarna och under pågående pass när ljudet är av.
- [x] Lägg till förstärkning upp till 800 procent, cirka +18 dB i signalamplitud. Detta har inte gett tillräcklig hörbarhet mot podcast enligt användarens iPhone-test.
- [x] Låt `Testa ljudet` aktivera och spara ljudet så att testknappen och träningspasset inte kan ha olika ljudläge.
- [x] Implementera ett sammanhängande, lokalt genererat WAV-spår för hela passet som avgränsad kandidat för bakgrundsuppspelning. Spåret innehåller startsignal och tydligare flertonsignaler varje knipsekund, medan vilan är tyst. När ljud är på styr spårets uppspelningstid timer och passprogression.
- [x] Synkronisera paus, fortsätt, ljud på/av och återgång till appen mot passets gemensamma tidslinje. När ljud är av räknar en monoton klocka ikapp efter att JavaScript varit pausat i bakgrunden.
- [ ] Förbättra ljudets hörbarhet tillsammans med podcast på iPhone och verifiera resultatet i samma lyssningssituation.
- [ ] Åtgärda att ljudet upphör vid skärmlås och verifiera att ljud, passprogression och paus/fortsätt håller ihop efter upplåsning.

Användarrapport från fysisk iPhone 2026-09-17: ljudet är fortfarande lågt i förhållande till podcast och upphör vid skärmlås. Offline och export fungerar. Rapporten anger inte volyminställning, iOS-version eller om testet kördes i Safari eller som installerad PWA. Problemen med ljud är därmed observerade på enheten; orsaken och en fungerande lösning återstår att verifiera.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: volymen skalade ljudets faktiska förstärkning, ändringar till 35 och 65 procent synkroniserades mellan inställningar och passvy och sparades i localStorage. Cache v11 installerades och inga JavaScriptundantag eller konsolfel uppstod.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: 300 procent gav tre gånger grundförstärkningen och 240 procent synkroniserades mellan inställningar och passvy samt sparades i localStorage. Cache v12 installerades och inga JavaScriptundantag eller konsolfel uppstod. Mixning med podd eller musik är inte verifierad på fysisk iPhone.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: maxnivån 800 procent gav åtta gånger signalamplituden, cirka +18 dB, och 400 procent visades som +12 dB samt sparades och synkroniserades. Cache v13 installerades utan JavaScriptundantag eller konsolfel. Den hörbara skillnaden och mixningen med andra appar behöver fortfarande bekräftas på fysisk iPhone.

Verifierat 2026-09-17 i isolerad lokal Chrome: `Testa och slå på ljud` ändrade det sparade ljudläget från av till på. Det efterföljande passet skapade startsignal och signaler under knip. Cache v14 installerades utan JavaScriptundantag eller konsolfel.

Verifierat 2026-09-17 i lokal Chromium-webbläsare: ett pass skapade en enda Blob-baserad WAV-källa, timer och fas gick framåt med ljudspåret, paus höll sekundtalet stilla och fortsätt återupptog progressionen. Ljud av tog bort mediespåret utan att stoppa timern och ljud på kunde starta ett nytt spår vid aktuell passposition. Cache v19 laddades med den färdiga ändringen och inga JavaScriptvarningar eller fel registrerades. Hörbarhet mot podcast, fortsatt uppspelning vid skärmlås och iOS styrning av andra appars ljud kan inte verifieras lokalt.

Webbplattformen kan inte välja iOS-ljudsessionens mixningsläge. Det sammanhängande mediespåret ger Safari och en installerad PWA bästa praktiska möjlighet att fortsätta vid skärmlås, men iOS kan fortfarande pausa en podcast när Knip startar eller pausa Knip när en annan app tar ljudfokus. Om samtidig uppspelning och skärmlås inte fungerar på den fysiska enheten kräver säker kontroll över detta en native-app med `AVAudioSession`, bakgrundsljud och uttryckligt mixnings- eller duckningsläge.

## Låg prioritet

- [x] Verifiera att exportfunktionen skapar giltig JSON med `schemaVersion`, exporttid, tidszon, programdata och träningsposter i ett isolerat JavaScript-test.
- [x] Bekräfta att historikexporten fungerar på iPhone enligt användarens test. Separat öppning och innehållskontroll av den exporterade filen på enheten är inte rapporterad.
- [ ] Komplettera senare med återställning av träningshistorik.

## Förbättringsförslag efter projektgenomgång 2026-09-17

Förbättringsförslag; punkterna är inte implementerade eller beslutade. Efter användarens iPhone-test prioriteras ljudproblemen först enligt rekommendationen nedan.

1. **Gör lokal lagring robust.** Validera inlästa historikposter och tidsinställningar, hantera fel från `localStorage` och visa om ett pass inte kunde sparas. Isolerade tester bekräftar att en `null`-post i historiken orsakar undantag och att negativa eller icke-numeriska sparade tider släpps igenom. Bevara giltig historik vid fel.
2. **Slutför iPhone-verifieringen av ljudspåret.** Användaren har bekräftat offline och export. Den lokala prototypen använder nu ett sammanhängande mediespår som gemensam tidskälla när ljud är på och räknar ikapp mot en monoton klocka när ljud är av. Testa hörbarhet mot podcast, skärmlås, återgång till appen samt paus och fortsätt. Bekräfta även hemskärmsinstallation och kallstart utan nät.
3. **Klart 2026-09-17: gör passets omfattning tydlig före start.** Passlängd och övergångens tre passdelar visas före start. Rekommendationen tre pass per dag skiljs från kravet minst ett komplett pass på aktiv nivå per dag i tre dagar i rad för erbjudande om nivåbyte. Se verifieringen nedan.
4. **Uppdatera dagsstatus när appen åter blir synlig.** Startsida och programvy renderas vid start och vissa handlingar, men inte vid dygnsskifte eller återgång från bakgrunden. Kontrollera datumbyte så att gårdagens status inte ligger kvar.
5. **Förbättra tillgängligheten.** Rätta startsidans `aria-labelledby`, som pekar på ett saknat `home-title`, hantera fokus vid vybyte och testa VoiceOver. Timerns sekundtal är idag en live-region medan fastexten ligger utanför; kontrollera att rätt information läses upp utan störande upprepning.
6. **Gör avslutet tydligare.** Visa genomförd nivå, passdelar och aktuell progression. Nuvarande sammanfattning visar främst sparningstid och eventuellt slutfört nivåbyte. Se även över formuleringen `Färdig för idag` i förhållande till rekommendationen om flera pass per dag.
7. **Avgränsa cachehanteringen.** Service workern tar idag bort alla cache-namn utom sitt eget vid aktivering. Begränsa rensningen till Knips cache och använd HTML-reservsvaret endast för sidnavigering, inte för misslyckade hämtningar av exempelvis skript eller bilder.

**Rekommenderat nästa utvecklingssteg:** verifiera den sammanhängande ljudprototypen på fysisk iPhone innan lösningen betraktas som fungerande. Kontrollera särskilt samtidig podcast, skärmlås och att fasen är oförändrat synkroniserad efter paus och upplåsning. Därefter stabilitetsomgången för lokal lagring (punkt 1), före avancerade program och påminnelser.

**Kontroller i denna genomgång:** JavaScript-syntax för `app.js` och `service-worker.js`, manifestets JSON och ikonreferenser samt isolerade Node-tester med simulerad DOM för sex nivåer, kvalificerande dagar, flera pass samma dag, avbrutet pass, ordningen i övergångens tre dagar, uppehåll under övergång och exportens JSON-innehåll. Detta är inte ett nytt webbläsar- eller iPhone-test; tidigare webbläsarresultat ovan är historiska verifieringar. Endast dokumentation ändrades.

## Passlängd och övergång före start 2026-09-17

- [x] Visa passlängd nära startknappen på startsidan och i programvyn, samt vanlig passlängd för varje nivå.
- [x] Använd samma tidslinje som timern och det sammanhängande ljudspåret: en förberedelse, varje repetition, fasta uthållighetstider, inställda knip- och vilotider samt vila efter sista knipet. Övergångens alla tre delar ingår; manuella pauser ingår inte.
- [x] Visa rätt tid när programknappen startar första övergångsdagen medan snabbstart fortfarande startar nuvarande nivå. Uppdatera båda vyerna när tidsinställningarna sparas.
- [x] Förklara tre passdelar i en körning: dag 1 en ny + två gamla, dag 2 två nya + en gammal, dag 3 tre nya. Tydliggör rekommendation, kvalificeringskrav och frivilligt nivåbyte.
- [x] Bevara lokala ljudändringar, träningsupplägg, kvalificeringsregler, timer och lagringsformat. Höj cache och versionsvisning till v23.

Verifierat i isolerad lokal Chrome: 84 tidsfall mot separat förväntad beräkning (sex vanliga nivåer och tre dagar för var och en av de fem nivåövergångarna, med fyra uppsättningar tider). Testerna omfattade standardtider, ändrad förberedelse och knip/vila samt gränserna 1 och 120 sekunder. Standardpassen är 1:25, 1:25, 1:45, 1:45, 2:15 och 3:15. Visad tid i båda vyerna matchade passets tidslinje.

Även verifierat: sparade tidsinställningar, snabbstart, erbjudande och start av övergång, paus/fortsätt, Blob-baserat ljudspår och ljud på/av med bibehållen dold volymkontroll, oförändrad localStorage vid omladdning, cache v23 och offline-snabbstart. Mobilvyer i 320 och 390 px kontrollerades utan horisontellt överflöde; skärmbilder granskades visuellt. Inga JavaScriptundantag eller konsolfel. JavaScript-syntax och diffkontroll godkända. Testkod och skärmbilder ligger utanför projektet.

Begränsning: fysisk iPhone, ljudets hörbarhet mot podcast och skärmlås är inte verifierade i denna ändring; tidigare öppna ljudpunkter kvarstår.

Publiceringsanteckning för beta/cache v23: ändringen levereras via projektets befintliga GitHub Pages-flöde vid push till `main`, på https://johanwistbacka.github.io/Knip/. Appfilerna kopieras till `_site` av GitHub Actions; dokumentation och lokala testfiler ingår inte i webbplatsen. Ingen separat release-tagg behövs för denna webbpublicering. Cacheversionen uppdaterar de statiska appfilerna utan att ändra träningsdata i localStorage.
