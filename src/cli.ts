import fs from "node:fs";

import { analyze } from "./analyze.js";
import { formatMarkdown, formatSummary } from "./format.js";
import type { ClaimsRealityExport } from "./types.js";

function usage() {
  console.log(`claims-vs-reality-engine

Usage:
  npx claims-vs-reality-engine <input.json> [--format summary|markdown|json]

Examples:
  npx claims-vs-reality-engine fixtures/claims-vs-reality.json --format summary
  npx claims-vs-reality-engine fixtures/claims-vs-reality-clean.json --format markdown`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  usage();
  process.exit(0);
}

const input = args[0];
const formatArgIndex = args.indexOf("--format");
const format = formatArgIndex >= 0 ? args[formatArgIndex + 1] ?? "summary" : "summary";

const raw = fs.readFileSync(input, "utf8");
const payload = JSON.parse(raw) as ClaimsRealityExport;
const report = analyze(payload);

if (format === "json") {
  console.log(JSON.stringify(report, null, 2));
} else if (format === "markdown") {
  console.log(formatMarkdown(report));
} else {
  console.log(formatSummary(report));
}
