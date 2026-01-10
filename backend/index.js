const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { CORS_ORIGIN } = require("./config");

const app = express();

console.log(require("./config"));
console.log(CORS_ORIGIN);

const ID = uuidv4();

// Health check endpoint (ALB checks /api/)
app.get("/api/", (req, res) => {
  res.status(200).send("ok");
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get(/.*/, (req, res) => {
  console.log(`${new Date().toISOString()} GET`);
  res.json({ id: ID });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend started on ${PORT}. ctrl+c to exit`);
});

