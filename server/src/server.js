require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 8000;
const http = require("http");
const server = http.createServer(app);

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const { mongoConnect } = require("./services/mongo");

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => console.log("Server is running", PORT));
}

startServer();
