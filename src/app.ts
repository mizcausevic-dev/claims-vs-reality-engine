import express from "express";

import { boardReadout, claimAudit, payload, proofGaps, summary, verification } from "./services/claimsVsRealityEngineService.js";
import { renderBoardReadout, renderClaimAudit, renderDocs, renderOverview, renderProofGaps, renderVerification } from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/claim-audit", (_req, res) => res.type("html").send(renderClaimAudit()));
  app.get("/proof-gaps", (_req, res) => res.type("html").send(renderProofGaps()));
  app.get("/board-readout", (_req, res) => res.type("html").send(renderBoardReadout()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/claim-audit", (_req, res) => res.json(claimAudit()));
  app.get("/api/proof-gaps", (_req, res) => res.json(proofGaps()));
  app.get("/api/board-readout", (_req, res) => res.json(boardReadout()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload()));

  return app;
}

const app = createApp();
export default app;

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT || 5550);
  app.listen(port, () => {
    console.log(`claims-vs-reality-engine listening on http://127.0.0.1:${port}`);
  });
}
