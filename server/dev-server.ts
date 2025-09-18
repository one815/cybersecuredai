import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const origins: string[] = [];
if (codespaceName) {
  origins.push(
    `https://${codespaceName}-5173.github.dev`,
    `https://${codespaceName}-4173.github.dev`
  );
}
origins.push("http://localhost:5173", "http://localhost:4173");

app.use(cors({ origin: origins, credentials: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "dev"
  });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`dev server listening on ${port}`);
});
