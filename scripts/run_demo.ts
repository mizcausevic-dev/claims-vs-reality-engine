import { analyze } from "../src/analyze.js";
import { sampleClaimsReality } from "../src/data/sampleClaimsReality.js";

const report = analyze(sampleClaimsReality, { now: "2026-05-31T09:00:00Z" });
console.log([
  `generatedAt: ${report.generatedAt}`,
  `vendors: ${report.vendors}`,
  `claims: ${report.claims}`,
  `contradictedClaims: ${report.contradictedClaims}`,
  `staleClaims: ${report.staleClaims}`,
  `evidenceScore: ${report.evidenceScore}`,
  `annualSpendUsd: ${report.annualSpendUsd}`,
  `replacementSavingsUsd: ${report.replacementSavingsUsd}`,
  `highFindings: ${report.findingsList.filter((finding) => finding.severity === "high").length}`
].join("\n"));
