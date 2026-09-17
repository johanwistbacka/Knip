# Hoppa över en nivå
## Syfte

Användaren ska kunna lämna en nivå som inte passar och fortsätta programmet utan att den överhoppade nivån räknas som genomförd.

## Beteende

- Visa åtgärden `Hoppa över nivå` i programvyn.
- Kräv en bekräftelse som tydligt anger vilken nivå som hoppas över.
- Markera nivån som `skipped`, inte som slutförd eller bemästrad.
- Aktivera nästa tillgängliga nivå direkt. Om flera nivåer redan är överhoppade väljs nästa nivå som inte är överhoppad.
- Ge ingen träningsdag, svit eller annan genomförandepoäng för nivåhoppet.
- Använd inte den överhoppade nivån som gammal övning i en mjuk övergång.
- Om ett nivåhopp görs under en pågående övergång avbryts övergången och programmet går vidare till nästa tillgängliga nivå.
- Dölj eller inaktivera åtgärden på den sista nivån när det inte finns någon senare nivå att gå till.
- Gör det möjligt att återaktivera en överhoppad nivå senare. Efter bekräftelse blir den återaktiverade nivån aktiv direkt och en eventuell övergång avbryts. Befintlig träningshistorik behålls.
- Under en övergång gäller nivåhoppet den nya nivån som visas som aktiv i programvyn.

## Lagring

Spara nivåhoppet som en separat programhändelse, inte som ett träningspass. Händelsen ska minst innehålla:

```js
{
  type: "level_skipped",
  timestamp: "ISO-8601",
  fromLevelId: "exercise-2",
  toLevelId: "exercise-3"
}
```

Vid återaktivering sparas motsvarande händelse med typen `level_reactivated`: `fromLevelId` är tidigare aktiv nivå och `toLevelId` är nivån som återaktiveras.

Programdata använder `schemaVersion: 2`, med överhoppade nivåer i `levelStatuses` och separata programhändelser i `events`. Båda följer med i historikexportens `program`. Äldre programdata läses in med tomma status- och händelsefält; befintlig aktiv nivå, övergång och träningshistorik behålls.

## Förhållande till progression

Kravet på tre träningsdagar i rad gäller bara genomförda träningspass. Ett nivåhopp uppfyller inte kravet och startar inte den vanliga tredagarsövergången med gamla och nya övningar.
