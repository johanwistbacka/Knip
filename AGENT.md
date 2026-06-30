# AGENT.md

## Projekt

Det här projektet är en enkel PWA för knipövningar som ska kunna köras lokalt i Safari på iPhone och installeras på hemskärmen.

## Teknik och ramar

- Ren HTML, CSS och JavaScript
- Ingen build-process
- Inga externa beroenden
- Allt ska fungera som statiska filer i en enkel mapp
- Appen ska fungera offline efter första laddning
- Lokal historik och statistik sparas i `localStorage`

## Funktioner

Appen ska innehålla:

1. Startsida med knapp: `Starta pass`
2. Träningspass med faser:
   - Förberedelse: 5 sek
   - Knip: 5 sek
   - Vila: 5 sek
   - 10 repetitioner som standard
3. Stor visuell timer med aktuell fas
4. Progressindikator, till exempel `Repetition 3 av 10`
5. Pausa/fortsätt
6. Avbryt
7. Klarvy med `Bra jobbat!`
8. Spara genomfört pass med datum och tid i `localStorage`
9. Statistikvy:
   - Antal pass totalt
   - Antal pass senaste 7 dagar
   - Senaste genomförda pass
10. Inställningar:
   - Kniptid i sekunder
   - Vilotid i sekunder
   - Antal repetitioner
   - Vibrationsfeedback på/av via `navigator.vibrate` om det stöds
11. PWA-stöd:
   - `manifest.json`
   - `service-worker.js`
   - enkel appikon

## Designriktning

- Mobil först
- Ska kännas som en enkel iPhone-app
- Stor tydlig typografi
- Diskret och lugn färgskala
- Stora tryckytor
- Ingen medicinsk ton, mer träningsstöd

## Kodstil

- Håll koden lättläst och enkel att vidareutveckla
- Kommentera viktiga delar, men undvik överkommentering
- Behåll lösningen fri från bibliotek och verktygskedjor

## Filer

Appens huvudfiler är:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `icon.svg`

## Viktig platsinformation

Den aktiva kopian av appen flyttades från arbetsmappen till:

- `/Users/johan/Documents/Projekt/Knip/`

Filerna i nuvarande arbetsmapp har tagits bort efter flytten. Om vidare ändringar behövs ska arbetet helst göras i projektmappen ovan, eller i en ny session som har den mappen som arbetsyta.
