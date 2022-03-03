const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouter = require("express").Router();

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
