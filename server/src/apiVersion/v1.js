const launchesRouter = require("../routes/launches/launches.router")
const planetsRouter = require("../routes/planets/planets.router")

const v1Api = require("express").Router()

v1Api.use("/planets", planetsRouter)
v1Api.use("/launches", launchesRouter)

module.exports = v1Api

