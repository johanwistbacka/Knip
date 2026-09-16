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
- Gör det möjligt att återaktivera en överhoppad nivå senare.

## Lagring

Spara nivåhoppet som en separat programhändelse, inte som ett träningspass. Händelsen ska minst innehålla:

```js
{
  type: "level_skipped",
  timestamp: "ISO-8601",
  fromLevelId: "level-2",
  toLevelId: "level-3"
}
```

Vid återaktivering sparas motsvarande händelse med typen `level_reactivated`.

## Förhållande till progression

Kravet på tre träningsdagar i rad gäller bara genomförda träningspass. Ett nivåhopp uppfyller inte kravet och startar inte den vanliga tredagarsövergången med gamla och nya övningar.
