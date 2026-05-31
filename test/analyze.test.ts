import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { formatMarkdown, formatSummary } from "../src/format.js";
import type { ClaimsRealityExport } from "../src/types.js";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = (name: string): ClaimsRealityExport =>
  JSON.parse(readFileSync(`${here}/../fixtures/${name}`, "utf8")) as ClaimsRealityExport;

const NOW = "2026-05-31T09:00:00Z";

describe("analyze", () => {
  it("counts vendors and claims", () => {
    const report = analyze(fixture("claims-vs-reality.json"), { now: NOW });
    expect(report.vendors).toBe(2);
    expect(report.claims).toBe(2);
    expect(report.contradictedClaims).toBe(2);
    expect(report.staleClaims).toBe(2);
    expect(report.annualSpendUsd).toBe(1060000);
    expect(report.replacementSavingsUsd).toBe(380000);
  });

  it("flags AI readiness and savings claims as high", () => {
    const report = analyze(fixture("claims-vs-reality.json"), { now: NOW });
    expect(report.findingsList.find((item) => item.code === "agent-readiness-overstated")?.severity).toBe("high");
    expect(report.findingsList.find((item) => item.code === "savings-claim-unproven")?.severity).toBe("high");
  });

  it("returns ok=true on a clean fixture", () => {
    const report = analyze(fixture("claims-vs-reality-clean.json"), { now: NOW });
    expect(report.ok).toBe(true);
    expect(report.findingsList.filter((item) => item.severity === "high")).toEqual([]);
  });
});

describe("formatters", () => {
  it("renders findings in markdown", () => {
    const markdown = formatMarkdown(analyze(fixture("claims-vs-reality.json"), { now: NOW }));
    expect(markdown).toContain("# Claims vs Reality Engine");
    expect(markdown).toContain("agent-readiness-overstated");
  });

  it("renders clean markdown and summary", () => {
    const report = analyze(fixture("claims-vs-reality-clean.json"), { now: NOW });
    expect(formatMarkdown(report)).toContain("No findings generated.");
    expect(formatSummary(report)).toContain("vendors: 1");
  });
});
