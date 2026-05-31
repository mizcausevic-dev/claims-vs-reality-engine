export type ClaimScope =
  | "AI_GOVERNANCE"
  | "PLATFORM_RELIABILITY"
  | "SECURITY_CONTROL"
  | "REVENUE_ATTRIBUTION"
  | "COST_EFFICIENCY"
  | "COMPLIANCE_POSTURE"
  | "IDENTITY_CONTROL"
  | "DATA_RESIDENCY";

export type EvidenceStatus = "CURRENT" | "STALE" | "MISSING";
export type ReviewStatus = "VERIFIED" | "PARTIAL" | "CONTRADICTED";

export interface ClaimRealityRecord {
  id: string;
  vendor: string;
  product: string;
  scope: ClaimScope;
  owner: string;
  boardSlide: string;
  claimHeadline: string;
  claimedState: string;
  observedState: string;
  evidenceStatus: EvidenceStatus;
  reviewStatus: ReviewStatus;
  annualSpendUsd: number;
  replacementSavingsUsd: number;
  buyerImpact: string;
  riskWindowDays: number;
  proofLinks: string[];
  note?: string;
}

export interface ClaimsRealityExport {
  records?: ClaimRealityRecord[];
}

export type FindingSeverity = "high" | "medium" | "low" | "info";

export type FindingCode =
  | "unverified-board-claim"
  | "stale-proof-pack"
  | "savings-claim-unproven"
  | "compliance-claim-unbacked"
  | "agent-readiness-overstated"
  | "reliability-claim-unverified"
  | "identity-control-gap"
  | "replacement-case-open"
  | "long-lived-proof-gap";

export interface Finding {
  code: FindingCode;
  severity: FindingSeverity;
  message: string;
  subject: string;
  subjectName?: string;
  scope?: ClaimScope;
  vendor?: string;
}

export interface PostureReport {
  generatedAt: string;
  vendors: number;
  claims: number;
  highRiskClaims: number;
  contradictedClaims: number;
  staleClaims: number;
  evidenceScore: number;
  annualSpendUsd: number;
  replacementSavingsUsd: number;
  findingsList: Finding[];
  ok: boolean;
}

export interface PostureOptions {
  now?: string;
  staleClaimAfterDays?: number;
}
