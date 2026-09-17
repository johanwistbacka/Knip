# Lokal träningsdata och progression
Status: grundfunktionerna för lokal historik, JSON-export och progression är implementerade i `app.js` och avstämda mot koden 2026-09-17. Användaren har samma dag bekräftat att export fungerar på iPhone. Skydd mot skadad eller otillgänglig lokal lagring återstår att förbättra; se `todo.md`. Acceptanskriterierna nedan är krav, inte ett påstående om att alla kantfall är verifierade.

## Mål

Användaren ska kunna följa sin träning över tid, exportera sin egen data och få ett tydligt men frivilligt förslag om när det är dags att gå vidare till nästa övning.

## Lokal träningshistorik

- Spara avslutade träningspass lokalt på enheten.
- Ingen träningsdata skickas från enheten utan att användaren själv väljer att exportera den.
- Historiken ska tåla framtida ändringar genom att varje post har en `schemaVersion`.
- Varje pass ska minst spara:
  - unikt id
  - start- och sluttid
  - lokal kalenderdag och tidszon
  - genomfört eller avbrutet
  - träningsläge
  - övningsnivå (`levelId`)
  - eventuell övergångsdag
  - vilka gamla och nya övningsblock som faktiskt genomfördes
- Användaren ska kunna exportera historiken som JSON. CSV kan läggas till senare för kalkylprogram.
- Exporten ska vara begriplig även utanför appen och innehålla exporttid samt schemaversion.
- Import och återställning från en tidigare JSON-export är ett separat, senare steg.

## När nästa övning blir tillgänglig

- Grundregel: nästa övning blir tillgänglig efter minst ett komplett kvalificerande pass under tre lokala kalenderdagar i rad.
- Flera pass samma dag räknas fortfarande som en träningsdag.
- En dag utan komplett kvalificerande pass bryter följden och återställer räknaren till noll.
- Dagar ska räknas enligt enhetens lokala kalenderdatum, inte som rullande 24-timmarsperioder.
- När kravet är uppfyllt ska appen erbjuda nästa övning. Bytet ska aldrig ske automatiskt.
- Användaren ska kunna välja att fortsätta med nuvarande övning och starta övergången senare.
- Gränssnittet ska visa tydlig status, exempelvis `2 av 3 dagar i rad`.

## Mjuk övergång till nästa övning

När användaren väljer att gå vidare sker övergången under tre träningsdagar. Varje dag består av tre planerade övningsblock:

1. Övergångsdag 1: ett block med den nya övningen och två block med den gamla.
2. Övergångsdag 2: två block med den nya övningen och ett block med den gamla.
3. Övergångsdag 3: endast den nya övningen. Därefter blir den nya övningen aktuell nivå.

Ordningen mellan gamla och nya block ska bestämmas i övningsprogrammet och visas innan passet startar. Historiken ska spara den ordning som faktiskt genomfördes.

## Avbrott och kantfall

- Kravet på tre dagar i rad gäller innan övergången startar.
- När en övergång redan har startat ska en missad dag pausa den, inte återställa den. Nästa genomförda träningsdag fortsätter på nästa övergångsdag.
- Ett avbrutet pass räknas inte som en kvalificerande träningsdag och för inte övergången framåt.
- Byte av tidszon eller manuell ändring av enhetens klocka får inte skapa dubbla kvalificerande dagar. Sparad lokal dag och tidszon ska göra förloppet granskningsbart.
- Den längsta övningen ska även fortsättningsvis kunna hoppas över enligt programmets separata regler.

## Acceptanskriterier

- Tre kompletta dagar i följd ger ett frivilligt erbjudande om nästa övning.
- Dag 1, dag 3 och dag 4 ger inte progression eftersom följden bröts.
- Två pass samma datum ger bara en dag i följden.
- En avbruten dag bryter kvalificeringsföljden.
- Övergången följer blandningen 1 ny + 2 gamla, 2 nya + 1 gammal, därefter endast ny.
- En missad dag mitt i övergången pausar den utan att förlora redan genomförda övergångsdagar.
- Exporterad JSON innehåller alla sparade pass och tillräcklig metadata för att tolka dem.
