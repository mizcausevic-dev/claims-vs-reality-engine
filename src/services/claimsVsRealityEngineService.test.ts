import { describe, expect, it } from "vitest";

import { boardReadout, claimAudit, payload, proofGaps, summary, verification } from "./claimsVsRealityEngineService.js";

describe("claimsVsRealityEngineService", () => {
  it("returns a stable summary shape", () => {
    expect(summary().vendors).toBeGreaterThan(0);
    expect(summary().annualSpendUsd).toBeGreaterThan(0);
    expect(summary().replacementSavingsUsd).toBeGreaterThanOrEqual(0);
  });

  it("returns one claim-audit item per executive lane", () => {
    expect(claimAudit()).toHaveLength(4);
    expect(claimAudit()[0]?.lane).toContain("lane");
  });

  it("sorts proof gaps by severity", () => {
    const items = proofGaps();
    expect(items[0]?.severity).toBe("high");
  });

  it("returns board readout packets", () => {
    expect(boardReadout()).toHaveLength(4);
    expect(boardReadout()[0]?.packetId).toContain("CVR-");
  });

  it("returns a full payload", () => {
    expect(payload().claimAudit).toHaveLength(4);
    expect(payload().proofGaps.length).toBeGreaterThan(0);
    expect(verification()).toHaveLength(5);
  });
});
