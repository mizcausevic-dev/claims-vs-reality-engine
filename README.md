# Claims vs Reality Engine

Board-ready executive intelligence surface for claim-versus-proof review. Reads synthetic vendor and platform review records, scores evidence freshness, highlights contradicted narratives, and packages board-ready diligence outputs.

- Live: `https://reality.kineticgain.com/`
- Routes: `/`, `/claim-audit/`, `/proof-gaps/`, `/board-readout/`, `/verification/`, `/docs/`
- APIs: `/api/dashboard/summary`, `/api/claim-audit`, `/api/proof-gaps`, `/api/board-readout`, `/api/verification`, `/api/sample`

## Why it exists

Leaders keep hearing confident claims from vendors, internal teams, and board decks:

- AI governance is production-ready
- savings are already realized
- identity posture is automated
- compliance evidence is current
- reliability and revenue systems are decision-grade

This repo turns those claims into a board-safe review surface that answers:

- what is actually proven
- what is stale or missing
- where the contradiction risk sits
- what belongs in a diligence or board memo

## Local run

```powershell
cd claims-vs-reality-engine
npm install
npm run verify
npm run prerender
npm run render:assets
node dist/app.js
```

Then open:

- `http://127.0.0.1:5550/`

## CLI

```powershell
npx claims-vs-reality-engine fixtures/claims-vs-reality.json --format summary
npx claims-vs-reality-engine fixtures/claims-vs-reality-clean.json --format markdown
```

## README proof assets

- `screenshots/01-overview-proof.png`
- `screenshots/02-claim-audit-proof.png`
- `screenshots/03-proof-gaps-proof.png`
- `screenshots/04-board-readout-proof.png`

## Safety

- synthetic sample data only
- read-only executive surface
- no vendor credentials, no contracts, no live board materials
