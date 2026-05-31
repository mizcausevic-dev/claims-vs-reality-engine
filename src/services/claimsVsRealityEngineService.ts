import { analyze } from "../analyze.js";
import { sampleClaimsReality } from "../data/sampleClaimsReality.js";

const report = analyze(sampleClaimsReality, { now: "2026-05-31T09:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    vendors: report.vendors,
    claims: report.claims,
    highRiskClaims: report.highRiskClaims,
    contradictedClaims: report.contradictedClaims,
    staleClaims: report.staleClaims,
    evidenceScore: report.evidenceScore,
    annualSpendUsd: report.annualSpendUsd,
    replacementSavingsUsd: report.replacementSavingsUsd,
    highFindings,
    recommendation:
      "Tighten proof freshness, cost-savings substantiation, identity governance evidence, and claim language before repeating these vendor and platform narratives to the board."
  };
}

export function claimAudit() {
  return [
    {
      lane: "AI and product claims lane",
      owner: "AI platform office",
      status: "red",
      relatedFindings: 3,
      focus: "Separate pilot language from production-grade AI readiness before board materials harden the wrong story.",
      nextAction: "Publish one current production control memo and strip unsupported readiness language from the board pack.",
      note: "This lane is where technical ambition most easily outruns proof."
    },
    {
      lane: "Savings and replacement lane",
      owner: "Finance systems",
      status: "red",
      relatedFindings: 2,
      focus: "Reconnect cost and replacement claims to current proof before CFO language turns into investor narrative.",
      nextAction: "Publish a replacement-case memo with tested migration assumptions and real savings evidence.",
      note: "Savings claims are expensive when they depend on aspiration instead of substantiation."
    },
    {
      lane: "Identity and compliance lane",
      owner: "Security and compliance operations",
      status: "red",
      relatedFindings: 4,
      focus: "Close certification debt, stale proof packs, and manual audit stitching before diligence reopens them.",
      nextAction: "Reissue one current identity and compliance packet with named owners and removed exception drift.",
      note: "This lane determines whether the board story survives a serious diligence review."
    },
    {
      lane: "Reliability and revenue lane",
      owner: "Executive operations",
      status: "yellow",
      relatedFindings: 3,
      focus: "Turn attribution and reliability partials into one board-safe explanation instead of scattered caveats.",
      nextAction: "Consolidate partial platform and revenue proof into one board-readout packet.",
      note: "This lane is usable, but still too stitched for a confident investor briefing."
    }
  ];
}

export function proofGaps() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList
    .map((finding) => ({
      ...finding,
      owner:
        finding.scope === "AI_GOVERNANCE"
          ? "AI platform office"
          : finding.scope === "COST_EFFICIENCY"
            ? "Finance systems"
            : finding.scope === "IDENTITY_CONTROL" || finding.scope === "COMPLIANCE_POSTURE"
              ? "Security and compliance operations"
              : "Executive operations"
    }))
    .sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function boardReadout() {
  return [
    {
      packetId: "CVR-11",
      lane: "AI readiness narrative",
      completenessScore: 42,
      status: "red",
      blocker: "Agent governance language is still ahead of the real control surface.",
      owner: "AI platform office",
      decisionNote: "Do not repeat production-grade language until one current proof packet closes the pilot-versus-production gap.",
      launchWindowHours: 72
    },
    {
      packetId: "CVR-31",
      lane: "Savings and replacement story",
      completenessScore: 38,
      status: "red",
      blocker: "The savings case still depends on untested migration assumptions and missing proof.",
      owner: "Finance systems",
      decisionNote: "This is the cleanest place to improve CFO credibility and surface investable margin decisions.",
      launchWindowHours: 84
    },
    {
      packetId: "CVR-14",
      lane: "Identity and compliance posture",
      completenessScore: 47,
      status: "red",
      blocker: "Certification debt and stale proof packs still undercut the diligence narrative.",
      owner: "Security and compliance operations",
      decisionNote: "Fund evidence clean-up here if the board or investors will probe trust, control, or audit posture.",
      launchWindowHours: 96
    },
    {
      packetId: "CVR-23",
      lane: "Reliability and revenue partials",
      completenessScore: 68,
      status: "yellow",
      blocker: "Two partial narratives still rely on caveats and stitched evidence.",
      owner: "Executive operations",
      decisionNote: "This lane is close to board-safe, but should be normalized into one cleaner proof packet first.",
      launchWindowHours: 48
    }
  ];
}

export function verification() {
  return [
    "Synthetic sample data only - no live vendor systems, contracts, or board materials are shipped.",
    "Claim-versus-proof findings come from modeled vendor and platform review records, not hidden production data.",
    "The engine is read-only and built for executive review, diligence packaging, and board memo preparation.",
    "Every score, savings estimate, and finding is reproducible from the exported review records.",
    "Board-facing conclusions stay bounded to the synthetic evidence shown in this repo."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    claimAudit: claimAudit(),
    proofGaps: proofGaps(),
    boardReadout: boardReadout(),
    verification: verification(),
    sample: sampleClaimsReality
  };
}
