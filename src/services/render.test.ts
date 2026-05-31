import { describe, expect, it } from "vitest";

import { renderBoardReadout, renderClaimAudit, renderDocs, renderOverview, renderProofGaps, renderVerification } from "./render.js";

describe("render", () => {
  it("renders the overview", () => {
    expect(renderOverview()).toContain("Claims vs Reality Engine");
  });

  it("renders the claim audit route", () => {
    expect(renderClaimAudit()).toContain("Claim Audit");
    expect(renderClaimAudit()).toContain("AI and product claims lane");
  });

  it("renders docs with api details", () => {
    expect(renderDocs()).toContain("/api/claim-audit");
    expect(renderDocs()).toContain("claims-vs-reality-engine");
  });

  it("renders board readout and verification", () => {
    expect(renderBoardReadout()).toContain("Board Readout");
    expect(renderProofGaps()).toContain("Proof Gaps");
    expect(renderVerification()).toContain("Verification");
  });
});
