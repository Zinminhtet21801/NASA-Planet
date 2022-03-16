const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const v1Api = require("./apiVersion/v1");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", v1Api);

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = app;
