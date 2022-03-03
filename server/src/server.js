const app = require("./app");
const PORT = process.env.PORT || 8000;
const http = require("http");
const server = http.createServer(app);
const { loadPlanetsData } = require("./models/planets.model");

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => console.log("Server is running", PORT));
}

startServer();
