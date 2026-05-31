import type { PostureReport } from "./types.js";

export function formatSummary(report: PostureReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `vendors: ${report.vendors}`,
    `claims: ${report.claims}`,
    `contradictedClaims: ${report.contradictedClaims}`,
    `staleClaims: ${report.staleClaims}`,
    `evidenceScore: ${report.evidenceScore}`,
    `annualSpendUsd: ${report.annualSpendUsd}`,
    `replacementSavingsUsd: ${report.replacementSavingsUsd}`,
    `highFindings: ${report.findingsList.filter((finding) => finding.severity === "high").length}`
  ].join("\n");
}

export function formatMarkdown(report: PostureReport) {
  const rows = report.findingsList
    .map(
      (finding) =>
        `| ${finding.severity} | ${finding.code} | ${finding.subjectName ?? finding.subject} | ${finding.message.replace(/\|/g, "\\|")} |`
    )
    .join("\n");

  return [
    "# Claims vs Reality Engine",
    "",
    `- Generated at: \`${report.generatedAt}\``,
    `- Evidence score: **${report.evidenceScore}**`,
    `- Contradicted claims: **${report.contradictedClaims}**`,
    `- Annual spend USD: **${report.annualSpendUsd}**`,
    `- Replacement savings USD: **${report.replacementSavingsUsd}**`,
    "",
    "## Findings",
    "",
    "| Severity | Code | Subject | Message |",
    "| --- | --- | --- | --- |",
    rows || "| info | none | none | No findings generated. |"
  ].join("\n");
}
