`claims-vs-reality-engine` has two layers:

1. analyzer
   - reads synthetic vendor and platform review records
   - scores contradiction risk, proof freshness, and readiness posture
   - emits a deterministic report used by every other interface

2. presentation
   - turns the same findings into claim-audit, proof-gap, and board-readout views
   - prerenders a static site and JSON APIs for buyer-readable review
   - keeps the same synthetic payload available to the CLI and the live surface
