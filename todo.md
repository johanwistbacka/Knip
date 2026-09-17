# Todo för Knip

Den här listan är vår startpunkt för fortsatt utveckling. Omprioriterad 2026-09-17 efter inventeringen av samtliga referensbilder. Saknade övningar och instruktioner ska implementeras med [Övningar och instruktioner – referens](resurser/ovningar-och-instruktioner-referens.md) som innehållsunderlag. Avbockat betyder implementerat eller dokumenterat enligt punkten; fysisk iPhone-verifiering redovisas separat.

## Aktuell prioritering

Ordningen nedan styr nästa arbete. Äldre checklistor och testanteckningar längre ned behålls för spårbarhet och är inte en konkurrerande prioritering. Att ett innehåll ska implementeras innebär inte att öppna val om tider, progression eller plattformsstöd redan är avgjorda.

### 1. Komplettera grundträningens instruktioner och timing

- [x] Sammanställ samtliga tolv program och stödtexter från 18 skärmbilder i referensdokumentet, inklusive källor, appstatus och öppna frågor.
- [x] Bestäm knip- och vilotider per typ: användaren godkände 2026-09-17 fasta 1 sekund knip + 2 sekunder vila för `Korta pulser`, även efter sista pulsen. Övriga typer behåller befintliga inställningar och fasta uthållighetstider. Pulstiderna är ett produktbeslut, inte avlästa ur bilderna eller medicinskt validerade.
- [x] Implementera beslutad timing för snabba knip och synkronisera timer, ljudspår och visad passlängd. Bevara grundprogrammets repetitionsantal och fasta uthållighetstider.
- [x] Komplettera de fyra typinstruktionerna med tydlig skillnad mellan lätt knip, styrka, uthållighet och snabba knip. Kraftangivelser och målgrupp är bedömda enligt innehållsavgränsningen nedan.
- [x] Inför samlad hjälp motsvarande `Prova knipen`, `Hitta rätt knip` och `Tips om träningen`, tillgänglig från startsidan och programmet.
- [x] Lägg till kroppslägen, tankebilder, spegel/beröring och råd om att inte spänna mage, skinkor och lår enligt referensens avsnitt 5, med eget språk.
- [x] Bedöm hur referensens test av urinstrålen ska hanteras: utelämnat ur appen i väntan på granskad lämplighet. Källans test och begränsning finns kvar i referensdokumentet.
- [x] Komplettera introduktion och avslappning samt ange hjälpens begränsade omfattning.
- [ ] Komplettera med granskat underlag för andning, råd vid smärta och när träning bör avbrytas eller vård sökas. Detta finns inte i skärmbilderna och har inte uppfunnits som apptext.
- [x] Lägg till vardagstips för lyft, gång och hosta samt förklara rekommenderad frekvens, period och frivilligt nivåbyte.
- [x] Kontrollera hjälp och instruktioner offline, med tangentbord och i mobilvy i lokal Chrome. Visa aktuell typinstruktion under passet och annonsera fas/typ i stället för varje sekundtal.
- [ ] Verifiera VoiceOver på fysisk iPhone, särskilt tal vid de korta puls- och vilofaserna samt typbyte under pass.

**Innehållsavgränsning 2026-09-17:** Självständiga texter bygger på B01–B06 (kroppslägen och grundupplägg), B13 (typer), B14–B15 (hitta rörelsen) och B06/B18 (vardag och rekommenderad frekvens/period). Hjälpen anger uttryckligen när anatomin gäller penis och pung; den är inte en ny anatomiskt generell vägledning. Referensens maximala kraft för styrka/snabba knip införs inte som generell uppmaning utan kompletterande målgrupps- och medicinsk granskning. Stadiga knip beskrivs med mer kraft än Känn in, uthållighet utan maximal kraft och pulser med snabb rörelse och full avslappning. Detta är en redaktionell avgränsning, inte en medicinskt validerad dosering. Effektlöften har inte lagts till. Appens befintliga kvalificering och tredelade övergång beskrivs separat från referensens rekommenderade perioder.

**Implementation:** Gemensam faslängdsfunktion styr pulssegmenten och timerns förloppsindikator. Ljudets WAV-spår och visad passlängd använder samma tidslinje. Inställningarnas räckvidd och de fasta pulstiderna förklaras före start. Standardtider för Steg 1–6 är nu 1:25, 1:25, 1:45, 1:45, 2:15 och 2:40. Cache/appversion är v24. Repetitionsantal, uthållighetens 15/25/35 sekunder, progression och lagringsformat är oförändrade.

**Verifierat lokalt 2026-09-17:** JavaScript-syntax och diffkontroll utan fel. I isolerad Chrome passerade 84 tidsfall för sex grundnivåer och samtliga övergångsdagar med standardtider, alternativa tider och 1/120-sekundsgränser. Visad passlängd stämde med tidslinjen. Riktade tester kontrollerade fem pulser, 1/2-sekunders faslängder, WAV-filens längd och faktiska ljuddata (en signal per puls, tyst vila), timerns faser/förloppslängd, avslut och avbrott i historiken. Med ljudspårets klocka testades pulsfas, paus, fortsätt och byte till ljud av. Snabbstart, sparade inställningar, nivåbyteserbjudande/start, oförändrad localStorage vid omladdning, cache v24 och offline-start passerade utan JavaScriptfel. Hjälpen kunde öppnas från båda ingångarna, manövreras med tangentbord och återlämna fokus till rätt knapp. ARIA-referenser kontrollerades. Hem/program/hjälp kontrollerades i 320/390 px och passvyn i 320 px utan horisontell överströmning; hjälp och passvy granskades även visuellt. Offline-omladdning gav fungerande hjälp och Steg 6 med rätt passlängd. Testskripten kördes utanför projektet och har inte tillfört beroenden eller buildsteg.

**Återstår:** Fysisk iPhone/Safari, VoiceOver, hörbarhet mot podcast och skärmlås är inte verifierade i detta arbete. Nya kliniska råd kräver kompletterande granskat underlag enligt checklistan. Inga avancerade program eller andra prioriteringar har implementerats; ingen commit, push eller publicering har gjorts.

### 2. Säkra befintligt träningsflöde före programutökningen

Ljudproblemen kvarstår som ett eget angeläget spår. Fysisk iPhone-verifiering kan ske samtidigt som innehållet i prioritet 1 färdigställs; väntan på enhetstest ska inte blockera dokumenterade innehållskompletteringar.

- [ ] Verifiera och åtgärda ljudets hörbarhet mot podcast och fortsatt uppspelning vid skärmlås på fysisk iPhone, inklusive återgång, paus och fortsätt. Se detaljer under `Ljud och skärmlås`.
- [x] Gör lokal lagring robust: validera historik och inställningar, hantera lagringsfel och bevara giltig data. Se tidigare fynd under projektgenomgången.
- [x] Uppdatera dagsstatus vid återgång till appen och lokalt dygnsskifte.
- [x] Avgränsa cachehanteringen till Knips egna cacheposter och rätt reservsvar per resurstyp.
- [x] Rätta vyernas tillgänglighetsbrister och fokusflöde samt gör avslutets nivå, passdelar och progression tydliga.
- [ ] Bekräfta hemskärmsinstallation, fristående PWA, kallstart offline och vibrationsstöd på fysisk iPhone; bevara fungerande export och historik.

- [x] Utred befintligt ljudspår och dokumenterade plattformsbegränsningar. Pausa tydligt vid avvisad/avbruten ljuduppspelning och skydda mot sena händelser från ett gammalt ljudspår. Ingen ny förstärkning eller ljudarkitektur. Se lokal verifiering och fysisk testlista nedan.

**Implementation och lokal verifiering 2026-09-17, v25:**

- Historik, tidsinställningar, booleska inställningar, volym och berörda programfält valideras. Äldre giltiga poster utan blockmetadata behålls. Felaktiga poster räknas inte i progressionen; läsbara original säkerhetskopieras till respektive `knip.*.recovery` innan ersättning och följer med i exporten. Om säkerhetskopieringen misslyckas skrivs originalet inte över. Vid läsfel skrivs okänd äldre data aldrig över i den sessionen.
- Skrivfel stoppar inte avslut/avbrott. Appen behåller data i minnet, visar osparade ändringar och erbjuder omsparning och direkt JSON-export. Automatisk omladdning vid cacheuppdatering undviks medan pass eller osparade ändringar finns. Om lagringen förblir blockerad måste nya pass exporteras före omladdning/stängning; minnet är inte beständig lagring. Export är fortfarande ingen importfunktion.
- Historik skrivs före progression. Nya övergångsposter har det tillagda fältet `transitionId`, så att en sparad post kan återställa ett misslyckat programskriv vid nästa start utan att blandas ihop med en tidigare övergång. Befintliga schemaversioner och äldre poster stöds.
- Lokal kalenderdag kontrolleras vid midnatt, återgång via synlighet/pageshow/fokus och minst en gång per minut medan JavaScript körs. Pågående tidslinje, pausläge och fokus bevaras. Öppna programdetaljer och fokus bevaras vid omrendering.
- Cache v25 har namn som är avgränsade till installationens sökväg. Endast egna gamla cacher rensas; äldre namn migreras bara när alla poster tillhör den här installationen. Installation hämtar om appfilerna och använder en sammanhängande version av HTML/skript/CSS även offline. HTML används enbart vid navigering; saknade skript/bilder får inget HTML-svar.
- Vyernas befintliga rubrikreferenser från prioritet 1 behålls. Passrubriken är nu en riktig rubrik. Fokus går till rätt vyrubrik, tillbaka till öppningsknappen när en vy stängs och förblir stabilt vid dagsuppdatering. Timern har ett läsbart sekundvärde utan sekundvisa live-utrop; fas, typ, tid, repetition/passdel och pausstatus annonseras vid byte. VoiceOver-utfallet återstår att verifiera på enheten.
- Avslutet visar genomförd nivå, eventuell övergångsdag, samtliga passdelar i ordning, progression och faktisk sparstatus. ”Färdig för idag” är ersatt med ”Ett pass genomfört”.

**Testresultat:** 57 riktade kontroller i isolerad lokal Chrome passerade: blandad/skadad/null/icke-array-historik, ogiltiga inställningar, blockerade läsningar, kvotfel, omsparning, export inklusive osparade poster och original, datumbyte, återgång, fokus, paus/fortsätt/avbrott/avslut, avvisad uppspelning och extern ljudpaus, offline samt 320/390 px utan horisontellt överflöde. Ytterligare 22 kontroller passerade för metadata/äldre poster, inställningsfel, nivåhopp/återaktivering, separat programskrivfel och återhämtning, övergångsdag 1–3, misslyckad säkerhetskopiering, programvalidering, bevarat fokus samt sena ljudhändelser och mediefel. Prioritet 1:s 84 tidsfall för samtliga nivåer/övergångar och tidsgränser passerade igen, liksom snabbstart, ljud på/av, inställningar, lagring vid omladdning och offline. Separat uppdateringstest från v24 till v25 bevarade pågående pass, localStorage och främmande cacher; cachefilerna matchade appfilerna och offline-navigering fungerade. Saknade JS/CSS/bilder gav inget HTML-reservsvar. Installation under `/Knip/`, offline-hjälp/snabbstart, löpande pass över midnatt och poster vid tillbakaställd väggklocka kontrollerades separat. Även hjälp via tangentbord, fem 1/2-sekundspulser, WAV-signal/tyst vila och medieklockans puls/paus/fortsätt passerade. Avslutsvy, sparfelsvy och passvy granskades visuellt. JavaScript-syntax och diffkontroll passerade. Testverktyg ligger utanför projektet; inga beroenden/buildsteg har lagts till.

**Ljudutredning:** WAV-spåret genereras redan för hela tidslinjen med en nästan fullskalig signal; volymreglaget sätter medieelementets volym till vald faktor/8. Ljudtestet använder däremot Web Audio och är därför inte ett säkert mått på passljudets upplevda nivå på iPhone. [MDN:s kompatibilitetsdata för media-volym](https://github.com/mdn/browser-compat-data/blob/main/api/HTMLMediaElement.json) anger att iOS Safari inte tillämpar skrivningar till `volume` på ljudnivån. Det experimentella [Audio Session API](https://developer.mozilla.org/en-US/docs/Web/API/AudioSession/type) har bland annat `ambient` för mixning och `playback` för exklusiv uppspelning; se även [W3C:s specifikation](https://www.w3.org/TR/audio-session/). Detta nyanserar den äldre noten nedan, men bevisar inte att samtidig podcast och skärmlås fungerar i aktuell Safari/PWA. Ingen sessionstyp har därför tvingats på och varken ljudfilens signal, volymskala eller arkitektur har ändrats. Lokalt verifierad förbättring är tydligt pausläge vid avvisad uppspelning, mediefel och avbrott, med Fortsätt eller ljud av som återväg. Det är inte en verifierad lösning på bakgrundsljud.

**Kort testlista – fysisk iPhone, ej utförd i detta arbete:**

- [ ] Notera iPhone/iOS-version, Safari eller hemskärms-PWA, hörlurar/högtalare, telefonvolym och appvolym. Spela samma podcast och jämför `Testa ljudet` med riktigt pass vid 100/400/800 %. Kontrollera om podcasten pausas eller om ljuden blandas.
- [ ] Lås skärmen under knip och vila i ett riktigt pass. Kontrollera hörbarhet, eventuell paus, upplåsningens fas/tid och Fortsätt. Upprepa med podcast, manuellt pausat pass samt ljud av/på; säkerställ att inget dubbelt pass sparas.
- [ ] Kör VoiceOver genom hem/program/hjälp/inställningar/pass/avslut. Kontrollera fokus, sparfel, fas/typ/paus och snabba 1/2-sekundsfaser utan störande talkö.
- [ ] Installera på hemskärmen och starta fristående. Stäng appen, slå på flygplansläge och kallstarta; kontrollera hjälp, pass, historik och exportfilens innehåll. Bekräfta v25 efter uppdatering.
- [ ] Testa vibration på/av och dokumentera om `navigator.vibrate` finns och faktiskt ger vibration. Markera inte stöd enbart för att inställningen går att spara.

### 3. Implementera Avancerad 1–6

Avancerade övningar flyttas från `Senare` till nästa programutökning efter prioritet 1–2. Referensens avsnitt 4 anger det konkreta innehållet.

- [x] Fastställ anslutningen från Steg 6, kvalificering och eventuell mjuk övergång för avancerade nivåer. Ändra inte grundprogrammets beslutade regler indirekt.
- [x] Bestäm hur lyft, gång/stopp och hosta ska guidas före och under pass, inklusive vad `vartannat` betyder i Avancerad 6.
- [x] Implementera Avancerad 1: 10 styrka → 1 uthållighet 35 sek → 10 styrka → 5 snabba.
- [x] Implementera Avancerad 2: 10 styrka → 1 uthållighet 35 sek → 10 styrka → 10 snabba.
- [x] Implementera Avancerad 3: 10 styrka med lyftrörelse → 1 uthållighet 45 sek.
- [x] Implementera Avancerad 4: 10 styrka → 1 uthållighet 45 sek med gång och stopp före avslappning.
- [x] Implementera Avancerad 5: 10 styrka → 1 uthållighet 60 sek → 10 styrka → 10 snabba med hostmoment.
- [x] Implementera Avancerad 6: Avancerad 5:s blockföljd två gånger, med lyft på vartannat styrkeknip, gång under uthållighet och hosta på vartannat snabbt knip.
- [x] Visa stående kroppsläge, period 1–2 veckor och rätt frekvens: tre pass per dag för Avancerad 1–4, två för Avancerad 5–6. Bevara separata block även när samma typ återkommer.
- [x] Bestäm gränser för kort/normal/lång, vilka avancerade nivåer som får hoppas över och hur eventuella kortare pass räknas. Implementera därefter längdmarkering, val och nivåhopp.
- [x] Koppla programmen till passlängd, timer, ljud, historik/export och beslutad progression. Bevara äldre data, överhoppade nivåer och pågående grundövergångar.
- [x] Verifiera alla sex blockföljder, totalsummor, uthållighetstider, rörelsemoment och övergångar samt snabbstart, paus/fortsätt, avbrott och offline efter uppdatering.

**Historisk förberedelse 2026-09-17, v26 – då inväntades produktbeslut:** Separata programdata för Avancerad 1–6 och egna svenska rörelseinstruktioner finns i `app.js`. De avancerade nivåerna är ännu inte anslutna till den aktiva programlistan, programvyn eller start/progression. Blockordning, repetitionsantal, uthållighetstider, frekvenser, stående läge och period 1–2 veckor har kontrollerats i ett isolerat datatest. De tre beslutspaketen om progression, rörelseguidning/räkning och passlängd/nivåhopp har skickats till användaren; förslagen är inte godkända eller implementerade som beteende. Korta pulser återanvänder det redan beslutade 1/2-sekundsupplägget när nivåerna kopplas in.

**Historisk regression under förberedelsen:** 84 tidsfall för grundprogrammet, 57 kontroller av lagring/vyflöden/ljudfel/offline och ytterligare 22 kontroller av äldre metadata, nivåhopp, övergångar och återhämtning passerade i isolerad lokal Chrome. Hjälp via tangentbord, 320/390 px, pulsfasernas timer och WAV-data, paus/fortsätt med medieklocka samt offline-hjälp/snabbstart passerade också. Dessa resultat gäller det bevarade grundflödet; integrerade avancerade pass och uppdatering från v25 till v26 är ännu inte testade. Cacheversionen är höjd till v26 för ändrade statiska filer. Fysisk iPhone är inte testad. Ingen commit, push eller publicering.

**Godkända beslut i denna fortsättning, 2026-09-17:**

1. Från Steg 6 till Avancerad 1 och mellan avancerade nivåer: minst ett komplett pass per lokal kalenderdag tre dagar i rad ger ett frivilligt direktbyte utan blandade pass. Grundprogrammets kvalificering och tredelade övergång behålls. Användaren kan dessutom välja valfri nivå direkt. Uppehåll behåller aktiv nivå, historik och pågående grundövergång; följden av kvalificerande dagar kan brytas.
2. Fulla instruktioner visas i en från början stängd accordion före start. Under avancerade pass visas kort text vid rätt repetition, utan nya tider eller ljudsignaler. Lyft avslutas stående; gång stoppas före avslappning utan separat stopptid; en hosta sker under pulsens knipsekund. Avancerad 6 använder repetition 2, 4, 6, 8 och 10 med omstart per block.
3. Kort pass <3 minuter, normalt 3–<5 och långt ≥5, beräknat med valda inställningar inklusive förberedelse och vila. Nivåhopp följer befintliga regler även för avancerade nivåer: nästa tillgängliga nivå, inget hopp från sista, återaktivering möjlig. Inga förkortade pass.

**Slutfört i v27:** Alla tolv nivåer är anslutna till programvy, start, gemensam tidslinje, ljud, avslut och historik/export. Avancerade nivåer visar stående läge, period 1–2 veckor och tre pass/dag för 1–4 respektive två för 5–6. Återkommande block hålls separata och i ordning. Standardlängder för Avancerad 1–6 är 4:20, 4:35, 2:35, 2:35, 5:00 och 9:55 (5 sekunder förberedelse, 5/5 för vanliga knip/vila, fasta uthållighetstider och 1/2 för pulser). Längdklassen är ingen svårighetsgradering.

Fritt nivåval har en bekräftelse, bevarar historik och övriga nivåstatusar, ger ingen träningsdag och avslutar en eventuell grundövergång först när användaren bekräftar det. Vald överhoppad nivå återaktiveras. Nya programhändelser `level_selected` och `level_advanced` samt valfria blockfält `movement` och `alternatingMovement` följer med i exporten. Äldre schema 1/2 och historik utan blockmetadata förblir läsbara. Startsidans snabbstart fortsätter på aktuell nivå även när ett frivilligt byte erbjuds i programvyn.

**Verifiering i denna fortsättning:** 2 263 riktade kontroller i lokal isolerad Chrome täcker sex avancerade blockföljder, frekvenser/perioder, fyra inställningskombinationer inklusive 1/120-sekundsgränser, klassgränserna 179/180/299/300 sekunder, varje timersegment, rörelseparitet per block, uthållighet, avslut, progression och WAV-längd/signal/tyst vila. UI-test täcker fritt nivåval, accordion, medieklocka, paus/fortsätt, ljud av/på, avbrott, nedladdad JSON-export med rörelsemetadata, omladdning, offline och 320/390 px utan överflöde. Program- och passvy granskades visuellt. Separata kantfall kontrollerar äldre schema 1 och historik utan metadata, långt uppehåll med bevarad grundövergång/inställningar, alla tolv nivåval, överhoppade avancerade nivåer, rätt nästa passlängd/instruktion före direktbyte samt accordionens tangentbord/fokus vid dagsuppdatering.

Grundprogrammets 84 tidsfall och de befintliga 57 flödes-/lagringskontrollerna plus 22 kantfall passerade på v27. Hjälp, ARIA, pulsens WAV-data, medieklocka och offline passerade också. Ett tidskänsligt medietest gav först annan fas än väntat vid en kontroll efter fast väntetid under samtidiga Chrome-körningar och passerade vid omkörning; ingen ändring i ljudmotorn gjordes. Ett nytt UI-test behövde korrigeras för att inte stänga ett redan öppet programkort. Uppdatering från faktisk v26-kopia till v27 testades på både `/` och `/Knip/`: pausat pass, äldre programdata, nivåhopp, grundövergång, inställningar och främmande cache bevarades; alla installerade appfiler matchade v27 och offline-navigering fungerade. Syntax- och diffkontroll passerade. Testverktyg och skärmbilder ligger utanför projektet; inga nya beroenden eller buildsteg.

**Kvarstående begränsningar:** Fysisk iPhone/Safari/PWA, VoiceOver, hörbarhet mot podcast, skärmlås och vibration är inte verifierade i detta arbete. Dessa öppna delar av prioritet 1–2 kvarstår. Varken underhållsläge, kalender, personliga mål eller påminnelser har införts. Ingen commit, push eller publicering.

**Påbörjad fysisk verifiering av v27, 2026-09-17:** En tillfällig lokal HTTP-server har startats på `http://192.168.1.167:8770/`, med endast appens statiska filer via länkar till arbetskopian. Adressen kräver samma lokala nätverk och att servern är igång. Från Macen svarade startsidan med v27 och levererad `app.js` hade identisk SHA-256 med arbetskopian. JavaScript-syntax för app/service worker och diffkontroll passerade. Detta är lokala kontroller, inte enhetsresultat. iPhone-modell, iOS-version, körläge och åtkomst från telefonen inväntas. HTTP-adressen kan användas för första åtkomstkontrollen; service worker och offline/PWA-verifiering kräver därefter en HTTPS-adress med certifikat som telefonen litar på. Ingen sådan adress är ännu ordnad och ingen publicering har gjorts. Inga fysiska v27-kontroller är ännu godkända.

### 4. Implementera långsiktig träning och underhåll

- [ ] Lägg till referensens råd om regelbundenhet, lämplig egen nivå, träning över tre månader och vardagsanvändning. Bedöm effektpåståenden innan de blir apptext.
- [ ] Bestäm hur underhållsträning ska väljas och räknas: referensen anger tre pass per dag under två till tre dagar per vecka, efter tre månaders träning vid tillräcklig förbättring.
- [ ] Implementera stöd för beslutat underhållsupplägg och fortsatt träning, med tydlig skillnad mot progressionens krav på dagar i rad.

### 5. Utöka uppföljning och påminnelser

- [ ] Implementera kalender/veckovy och tydligare dagsstatus för genomförda pass i förhållande till rekommendationen.
- [ ] Specificera och implementera personligt träningsmål med återkoppling över de senaste sju dagarna. Bilden visar inte beräkningsregeln.
- [ ] Utred iPhone-PWA-stöd och specificera påminnelser med tid, text, veckodagar, aktivering och eventuellt snooze; implementera utifrån verifierat stöd.
- [ ] Utvärdera därefter nivåbelöningar, fler milstolpar, valbara ljud, anpassade påminnelser och ytterligare program.

**Nästa konkreta arbete:** fysisk iPhone-verifiering enligt prioritet 2:s testlista samt granskat underlag för kvarstående råd i prioritet 1. Den lokalt genomförbara stabiliseringen i prioritet 2 är implementerad och testad; hörbarhet/skärmlås är fortfarande öppna. Avancerade program är nu implementerade i v27 enligt prioritet 3. Underhållsläge, kalender och påminnelser ingår inte. Ingen commit, push eller publicering har gjorts i detta arbete.

## Tidigare checklista: underlag och grundbeslut

Punkter som också finns i prioriteringen ovan avser samma arbete, inte separata leveranser.

- [x] Sammanställ exakt innehåll för `Avancerad 1-6` från referensbilderna; se det nya referensdokumentet.
- [x] Märk varje pass som `kort`, `normal` eller `lång` enligt godkända gränser i prioritet 3.
- [x] Bestäm regler för att hoppa över grundprogrammets nivåer: alla utom sista tillgängliga nivån kan hoppas över och senare återaktiveras.
- [x] Bestäm vilka avancerade långa pass användaren får hoppa över: alla med en senare tillgänglig nivå.
- [x] Fastställ progressionen genom `Övning 1-6`.
- [x] Fastställ fortsättningen från Steg 6 till Avancerad 1 enligt prioritet 3.
- [x] Bestäm om nivåbyte kräver antal dagar, antal genomförda pass eller båda: minst ett komplett pass per lokal kalenderdag under tre dagar i rad, följt av ett frivilligt nivåbyte.
- [x] Fastställ den mjuka övergången som tre passdelar i ett sammanhängande träningspass:
  - dag 1: `1 ny + 2 gamla passdelar`
  - dag 2: `2 nya + 1 gammal passdel`
  - dag 3: `3 nya passdelar`
- [x] Bestäm vad som händer efter missade dagar eller ett längre uppehåll: kvalificeringsföljden bryts, påbörjad övergång pausas och aktiv nivå behålls.
- [x] Bygg grundflöden för start, dagens pass, nivåbyte och avslutat pass.
- [x] Komplettera första starten med en kort introduktion till träningen och progressionen; visas på startsidan utan att blockera snabbstart.
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
- [x] Inför nivåhopp även för avancerade pass. Kortare pass införs inte enligt beslut i prioritet 3.
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

Avancerade program, kalender och personliga mål har flyttats till prioritet 3 respektive 5 ovan.

- [ ] Lägg till fler milstolpar och belöningar.
- [ ] Anpassa påminnelser efter träningsvanor.
- [ ] Utvärdera ytterligare program utöver de tolv dokumenterade nivåerna.

## Underlag

- [Övningar och instruktioner – komplett referens från skärmbilderna](resurser/ovningar-och-instruktioner-referens.md)
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

**Äldre bedömning, nyanserad i v25-utredningen ovan:** dåvarande implementation valde inte iOS-ljudsessionens mixningsläge. Det finns nu dokumenterat experimentellt webb-API för sessionstyp, men ingen verifierad lösning för Knips kombination av podcast och skärmlås. Det sammanhängande mediespåret ger Safari och en installerad PWA bästa praktiska möjlighet att fortsätta vid skärmlås, men iOS kan fortfarande pausa en podcast när Knip startar eller pausa Knip när en annan app tar ljudfokus. Om samtidig uppspelning och skärmlås inte fungerar på den fysiska enheten kräver säker kontroll över detta en native-app med `AVAudioSession`, bakgrundsljud och uttryckligt mixnings- eller duckningsläge.

## Låg prioritet

- [x] Verifiera att exportfunktionen skapar giltig JSON med `schemaVersion`, exporttid, tidszon, programdata och träningsposter i ett isolerat JavaScript-test.
- [x] Bekräfta att historikexporten fungerar på iPhone enligt användarens test. Separat öppning och innehållskontroll av den exporterade filen på enheten är inte rapporterad.
- [ ] Komplettera senare med återställning av träningshistorik.

## Förbättringsförslag efter projektgenomgång 2026-09-17

Tidigare fynd och förbättringsförslag. Kvarstående stabilitets- och tillgänglighetsarbete är nu inordnat i prioritet 2 ovan. Numreringen här är historisk och anger inte aktuell arbetsordning.

1. **Gör lokal lagring robust.** Validera inlästa historikposter och tidsinställningar, hantera fel från `localStorage` och visa om ett pass inte kunde sparas. Isolerade tester bekräftar att en `null`-post i historiken orsakar undantag och att negativa eller icke-numeriska sparade tider släpps igenom. Bevara giltig historik vid fel.
2. **Slutför iPhone-verifieringen av ljudspåret.** Användaren har bekräftat offline och export. Den lokala prototypen använder nu ett sammanhängande mediespår som gemensam tidskälla när ljud är på och räknar ikapp mot en monoton klocka när ljud är av. Testa hörbarhet mot podcast, skärmlås, återgång till appen samt paus och fortsätt. Bekräfta även hemskärmsinstallation och kallstart utan nät.
3. **Klart 2026-09-17: gör passets omfattning tydlig före start.** Passlängd och övergångens tre passdelar visas före start. Rekommendationen tre pass per dag skiljs från kravet minst ett komplett pass på aktiv nivå per dag i tre dagar i rad för erbjudande om nivåbyte. Se verifieringen nedan.
4. **Uppdatera dagsstatus när appen åter blir synlig.** Startsida och programvy renderas vid start och vissa handlingar, men inte vid dygnsskifte eller återgång från bakgrunden. Kontrollera datumbyte så att gårdagens status inte ligger kvar.
5. **Förbättra tillgängligheten.** Rätta startsidans `aria-labelledby`, som pekar på ett saknat `home-title`, hantera fokus vid vybyte och testa VoiceOver. Timerns sekundtal är idag en live-region medan fastexten ligger utanför; kontrollera att rätt information läses upp utan störande upprepning.
6. **Gör avslutet tydligare.** Visa genomförd nivå, passdelar och aktuell progression. Nuvarande sammanfattning visar främst sparningstid och eventuellt slutfört nivåbyte. Se även över formuleringen `Färdig för idag` i förhållande till rekommendationen om flera pass per dag.
7. **Avgränsa cachehanteringen.** Service workern tar idag bort alla cache-namn utom sitt eget vid aktivering. Begränsa rensningen till Knips cache och använd HTML-reservsvaret endast för sidnavigering, inte för misslyckade hämtningar av exempelvis skript eller bilder.

**Omprioriterat 2026-09-17:** nästa arbete styrs av `Aktuell prioritering` överst. Den tidigare rekommendationen att börja med enbart iPhone-ljud ersätts av grundinnehåll och timing först, med fortsatt enhetsverifiering som ett samtidigt spår. Ljud och lagringsstabilitet ska fortfarande hanteras före utökningen med avancerade program.

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

## Förenklad startsida 2026-09-17, v28

- [x] Fokusera startsidan på aktuell nivå, passlängd och snabbstart. Program, framsteg, inställningar och hjälp finns som diskreta menyval.
- [x] Behåll instruktioner och progressionsförklaringar i program/hjälp. Avancerade pass har en utfällbar ”Inför passet”; pågående grundövergång visar dag och tre passdelar.
- [x] Flytta cacheversion till inställningar och dölj Hem-knappen på startsidan. Höj cache/appversion till v28 och versionsmärk CSS/JS-adresser för att undvika äldre HTTP-cache i lokal förhandsvisning; filerna ingår i offline-cachen.

Verifierat i lokal webbläsare: startsidan visuellt i 320 px och datorvy, 320/390 px utan horisontellt överflöde, samtliga fyra menyval, hjälp/tillbaka och snabbstart/paus/fortsätt/avbrott. Inga konsolfel i den separata testfliken med aktuella filer. Nätverksförhandsvisningen laddar också aktuell startsida med passlängd efter versionsmärkningen. JavaScript-syntax och diffkontroll passerade. Fysisk iPhone och ny offline-/cachemigrering har inte testats i denna ändring. Ingen commit, push eller publicering.

## GitHub Pages – publicering av v28, 2026-09-17

Publiceringspaketet samlar instruktioner och fast pulstiming, robust lokal lagring, avgränsad offline-cache, förbättrat fokus/avslut, Avancerad 1–6 med fritt nivåval samt den förenklade startsidan. Befintligt Pages-arbetsflöde publicerar appfilerna vid push till `main`: https://johanwistbacka.github.io/Knip/ . Tidigare anteckningar om att ingen publicering gjorts avser respektive utvecklingssteg.

Kontroller före push: JavaScript-syntax och `git diff --check` passerade. Ett nytt isolerat Chrome-test av v28 verifierade menyval och hjälp, snabbstart, paus/fortsätt/avbrott, alla tolv passlängder, avslut på Avancerad 6, bibehållen localStorage vid omladdning, cache v28, hjälp och passstart offline samt 320/390 px utan horisontellt överflöde. Inga JavaScriptfel registrerades. Testet kördes utanför projektet utan nya beroenden. Fysisk iPhone, VoiceOver, ljud mot podcast och skärmlås återstår enligt checklistorna ovan.
