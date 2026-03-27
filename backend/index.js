const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(4000, () => {
  console.log("Backend rodando na porta 4000");
});
