import request from "supertest";

process.env.NODE_ENV = "test";
const { createApp } = await import("../src/app.js");

const app = createApp();

const htmlRoutes = ["/", "/claim-audit", "/proof-gaps", "/board-readout", "/verification", "/docs"];
for (const route of htmlRoutes) {
  const response = await request(app).get(route);
  if (response.status !== 200) {
    throw new Error(`expected ${route} to return 200, got ${response.status}`);
  }
}

const apiRoutes = [
  "/api/dashboard/summary",
  "/api/claim-audit",
  "/api/proof-gaps",
  "/api/board-readout",
  "/api/verification",
  "/api/sample"
];

for (const route of apiRoutes) {
  const response = await request(app).get(route);
  if (response.status !== 200) {
    throw new Error(`expected ${route} to return 200, got ${response.status}`);
  }
}

console.log("smoke_check: ok");
