const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");
const parser = parse({
  comment: "#",
  columns: true,
});

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

async function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "../../data/kepler_data.csv"))
      .pipe(parser)
      .on("data", async (data) => {
        if (isHabitable(data)) {
          // await planets.find({}, (err, docs) => console.log(docs));
          // await planets.create({ keplerName: data.kepler_name });
          // habitablePlanets.push(data);
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = await getAllPlanets();
        console.log(
          countPlanetsFound.length,
          " habitable planets found. 🚀🚀🚀 "
        );
      });
    resolve();
  });
}

async function getAllPlanets() {
  return await planets.find({},{
    "_id" : 0,
    "__v" : 0
  });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
