import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { boardReadout, claimAudit, payload, proofGaps, summary, verification } from "../src/services/claimsVsRealityEngineService.js";
import { renderBoardReadout, renderClaimAudit, renderDocs, renderOverview, renderProofGaps, renderVerification } from "../src/services/render.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = path.join(root, "site");

rmSync(site, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("claim-audit", "index.html")]: renderClaimAudit(),
  [path.join("proof-gaps", "index.html")]: renderProofGaps(),
  [path.join("board-readout", "index.html")]: renderBoardReadout(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://reality.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://reality.kineticgain.com/</loc></url>
  <url><loc>https://reality.kineticgain.com/claim-audit/</loc></url>
  <url><loc>https://reality.kineticgain.com/proof-gaps/</loc></url>
  <url><loc>https://reality.kineticgain.com/board-readout/</loc></url>
  <url><loc>https://reality.kineticgain.com/verification/</loc></url>
  <url><loc>https://reality.kineticgain.com/docs/</loc></url>
</urlset>`,
  [path.join("api", "dashboard", "summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "claim-audit.json")]: JSON.stringify(claimAudit(), null, 2),
  [path.join("api", "proof-gaps.json")]: JSON.stringify(proofGaps(), null, 2),
  [path.join("api", "board-readout.json")]: JSON.stringify(boardReadout(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: JSON.stringify(payload(), null, 2)
};

for (const [relativePath, contents] of Object.entries(files)) {
  const fullPath = path.join(site, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}
