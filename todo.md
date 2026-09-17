# Todo för Knip

Den här listan är vår startpunkt för fortsatt utveckling. Vi börjar med att fatta produktbesluten och rör därefter koden.

## Innan vi börjar koda

- [ ] Sammanställ exakt innehåll för `Avancerad 1-6` från referensbilderna.
- [ ] Märk varje pass som `kort`, `normal` eller `lång`.
- [ ] Bestäm vilka långa pass användaren får hoppa över.
- [ ] Fastställ progressionen genom `Övning 1-6` och vidare till avancerade repetitionspass.
- [ ] Bestäm om nivåbyte kräver antal dagar, antal genomförda pass eller båda.
- [ ] Fastställ den mjuka övergången:
  - dag 1: `1 nytt + 2 gamla pass`
  - dag 2: `2 nya + 1 gammalt pass`
  - dag 3: `bara nya pass`
- [ ] Bestäm vad som händer efter missade dagar eller ett längre uppehåll.
- [ ] Skissa flöden för första start, dagens pass, nivåbyte och avslutat pass.
- [ ] Bestäm ljudsignaler för `start`, `knip`, `vila`, byte av kniptyp och avslutat pass.
- [ ] Bestäm om användaren kan välja ljud, volym och tyst läge.
- [ ] Definiera påminnelser, tider och snoozeval.
- [ ] Kontrollera vad iPhone-PWA stödjer för notiser och snooze.
- [ ] Välj första versionens gamification: progression, streak, veckomål och nivåbelöningar.
- [ ] Bestäm vilken historik och dagsstatus som ska visas.
- [ ] Skriv korta instruktioner för varje kniptyp och nödvändig säkerhetsinformation.
- [ ] Ange acceptanskriterier för den första versionen.

## Första implementationen

- [x] Gör träningsprogrammen datadrivna.
- [x] Bygg programflödet för `Övning 1-6`.
- [x] Spara aktiv nivå, nivådagar och genomförda pass.
- [x] Implementera den mjuka övergången mellan nivåer.
- [x] Lägg till ljud för skärmfri träning.
- [ ] Lägg till val för kortare pass och möjlighet att hoppa över långa pass.
- [x] Bygg avslutsskärm med passammanfattning och progression.
- [ ] Lägg till snoozbara påminnelser utifrån verifierat plattformsstöd.
- [ ] Lägg till den valda första nivån av gamification.
- [ ] Testa hela flödet på mobil och som installerad PWA.

## Åtgärder efter webbläsartest 2026-09-17

- [x] Höj `CACHE_NAME` i `service-worker.js` från `knip-cache-v8` till nästa version så att aktuell `index.html`, `app.js` och övriga statiska filer installeras som en sammanhängande cache.
- [x] Verifiera uppdateringsflödet på rotadressen utan cachebrytande frågeparameter och kontrollera att inga JavaScriptfel uppstår vid ljudkontrollerna.
- [ ] Testa hörbara ljudsignaler och vibrationsfeedback på en fysisk iPhone.
- [ ] Testa installation på hemskärmen, start i fristående PWA-läge och offline-start på en fysisk iPhone.
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

- [ ] Lägg till åtgärden `Hoppa över nivå` i programvyn med bekräftelse.
- [ ] Markera nivån som `skipped`; räkna den inte som genomförd och ge ingen träningsdag eller svit.
- [ ] Gå vidare till nästa tillgängliga nivå och hoppa över redan överhoppade nivåer.
- [ ] Använd inte en överhoppad nivå som gammal övning i en mjuk övergång.
- [ ] Avbryt en pågående övergång om användaren hoppar över nivån.
- [ ] Spara nivåhopp och återaktivering som separata programhändelser.
- [ ] Låt användaren återaktivera en överhoppad nivå senare.
- [ ] Dölj eller inaktivera nivåhopp på sista nivån när ingen senare nivå finns.

## Ljud och skärmlås

- [x] Lägg till en sparad volymkontroll i inställningarna och under pågående pass.
- [x] Låt ljudet förstärkas upp till 800 procent, cirka +18 dB, för en tydligt hörbar relativ mix mot podd eller musik.
- [x] Låt `Testa ljudet` aktivera och spara ljudet så att testknappen och träningspasset inte kan ha olika ljudläge.
- [ ] Utred ett sammanhängande ljudspår som utvecklingsmöjlighet för bakgrundsuppspelning med låst skärm. Testa på fysisk iPhone om ljudspåret fortsätter och hur Knip blandas med podd eller musik; nuvarande JavaScript-timer och Web Audio kan pausas när skärmen låses.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: volymen skalade ljudets faktiska förstärkning, ändringar till 35 och 65 procent synkroniserades mellan inställningar och passvy och sparades i localStorage. Cache v11 installerades och inga JavaScriptundantag eller konsolfel uppstod.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: 300 procent gav tre gånger grundförstärkningen och 240 procent synkroniserades mellan inställningar och passvy samt sparades i localStorage. Cache v12 installerades och inga JavaScriptundantag eller konsolfel uppstod. Mixning med podd eller musik är inte verifierad på fysisk iPhone.

Verifierat 2026-09-17 i isolerad lokal Chrome med mobilvy: maxnivån 800 procent gav åtta gånger signalamplituden, cirka +18 dB, och 400 procent visades som +12 dB samt sparades och synkroniserades. Cache v13 installerades utan JavaScriptundantag eller konsolfel. Den hörbara skillnaden och mixningen med andra appar behöver fortfarande bekräftas på fysisk iPhone.

Verifierat 2026-09-17 i isolerad lokal Chrome: `Testa och slå på ljud` ändrade det sparade ljudläget från av till på. Det efterföljande passet skapade startsignal och signaler under knip. Cache v14 installerades utan JavaScriptundantag eller konsolfel.

## Låg prioritet

- [ ] Verifiera att `Exportera historik` laddar ned en giltig JSON-fil med `schemaVersion`, programdata och träningsposter, och komplettera senare med återställning av träningshistorik.
