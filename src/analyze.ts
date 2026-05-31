import type { ClaimRealityRecord, ClaimsRealityExport, Finding, PostureOptions, PostureReport } from "./types.js";

function includesAny(text: string, needles: string[]): boolean {
  const haystack = text.toLowerCase();
  return needles.some((needle) => haystack.includes(needle));
}

function addClaimFindings(record: ClaimRealityRecord, staleClaimAfterDays: number, findingsList: Finding[]) {
  const observed = record.observedState.toLowerCase();

  if (record.reviewStatus === "CONTRADICTED") {
    findingsList.push({
      code: "unverified-board-claim",
      severity: "high",
      message: `Board-facing claim on "${record.product}" is contradicted by the current proof pack.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.evidenceStatus === "STALE" || record.evidenceStatus === "MISSING") {
    findingsList.push({
      code: "stale-proof-pack",
      severity: record.evidenceStatus === "MISSING" ? "high" : "medium",
      message: `Proof pack for "${record.product}" is ${record.evidenceStatus.toLowerCase()} and should not anchor an executive memo.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.scope === "COST_EFFICIENCY" && includesAny(observed, ["manual export", "unmeasured savings", "untested replacement", "buyout clause"])) {
    findingsList.push({
      code: "savings-claim-unproven",
      severity: "high",
      message: `Savings story for "${record.product}" is not supported strongly enough to defend in front of the board.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.scope === "COMPLIANCE_POSTURE" && includesAny(observed, ["draft audit", "late evidence", "manual remediation", "unmapped obligation"])) {
    findingsList.push({
      code: "compliance-claim-unbacked",
      severity: "high",
      message: `Compliance claim on "${record.product}" is too weakly evidenced for a diligence-safe narrative.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.scope === "AI_GOVERNANCE" && includesAny(observed, ["pilot-only", "manual review", "no production gate", "draft policybundle"])) {
    findingsList.push({
      code: "agent-readiness-overstated",
      severity: "high",
      message: `AI or agent readiness on "${record.product}" is overstated relative to the current production controls.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.scope === "PLATFORM_RELIABILITY" && includesAny(observed, ["manual failover", "partial rollback", "slo drift", "incident costing"])) {
    findingsList.push({
      code: "reliability-claim-unverified",
      severity: "medium",
      message: `Reliability claim on "${record.product}" is not verified tightly enough for the current board story.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.scope === "IDENTITY_CONTROL" && includesAny(observed, ["shared admin", "manual cert", "orphaned access", "exception debt"])) {
    findingsList.push({
      code: "identity-control-gap",
      severity: "high",
      message: `Identity control claim on "${record.product}" hides governance gaps that matter in diligence.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.replacementSavingsUsd > 0 && includesAny(observed, ["replacement path", "migration", "replacement candidate", "buyout clause"])) {
    findingsList.push({
      code: "replacement-case-open",
      severity: "medium",
      message: `Replacement case for "${record.product}" is open enough to deserve board-level cost review.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }

  if (record.riskWindowDays > staleClaimAfterDays) {
    findingsList.push({
      code: "long-lived-proof-gap",
      severity: record.riskWindowDays > staleClaimAfterDays * 2 ? "medium" : "low",
      message: `Proof gap on "${record.product}" has remained unresolved for ${record.riskWindowDays} days.`,
      subject: record.id,
      subjectName: record.claimHeadline,
      scope: record.scope,
      vendor: record.vendor
    });
  }
}

export function analyze(payload: ClaimsRealityExport, options: PostureOptions = {}): PostureReport {
  const now = options.now ?? new Date().toISOString();
  const staleClaimAfterDays = options.staleClaimAfterDays ?? 30;
  const records = payload.records ?? [];
  const findingsList: Finding[] = [];

  for (const record of records) {
    addClaimFindings(record, staleClaimAfterDays, findingsList);
  }

  const vendors = new Set(records.map((record) => record.vendor)).size;
  const claims = records.length;
  const contradictedClaims = records.filter((record) => record.reviewStatus === "CONTRADICTED").length;
  const highRiskClaims = contradictedClaims;
  const staleClaims = records.filter((record) => record.evidenceStatus !== "CURRENT").length;
  const annualSpendUsd = records.reduce((sum, record) => sum + record.annualSpendUsd, 0);
  const replacementSavingsUsd = records.reduce((sum, record) => sum + record.replacementSavingsUsd, 0);
  const evidencePenalty =
    contradictedClaims * 8 +
    staleClaims * 4 +
    findingsList.filter((item) => item.severity === "high").length * 5 +
    findingsList.filter((item) => item.severity === "medium").length * 2;
  const evidenceScore = Math.max(0, 100 - evidencePenalty);
  const ok = contradictedClaims === 0 && staleClaims <= 1;

  return {
    generatedAt: now,
    vendors,
    claims,
    highRiskClaims,
    contradictedClaims,
    staleClaims,
    evidenceScore,
    annualSpendUsd,
    replacementSavingsUsd,
    findingsList,
    ok
  };
}
