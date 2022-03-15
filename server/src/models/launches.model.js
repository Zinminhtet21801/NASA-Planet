const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: [
    "NASA",
    "SpaceX",
    "ESA",
    "JAXA",
    "CSA",
    "COSPAR",
    "CNES",
    "CISSA",
    "CSA",
  ],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(id) {
  return await launches.findOne({ flightNumber: id });
}

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

//28

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZEKE"],
    flightNumber: (await getLatestFlightNumber()) + 1,
  });
  await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No Matching Planet Found");
  }
  return await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function abortLaunch(id) {
  return await launches.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  // const aborted = launches.get(id);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  // const index = Array.from(launches.values()).findIndex(
  //   (launchObj) => launchObj.flightNumber === id
  // );
  // const mapToArray = Array.from(launches.values());
  // mapToArray.splice(index, 1)
  // return mapToArray
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       customers: ["ZEKE"],
//       flightNumber: latestFlightNumber,
//       upcoming: true,
//       success: true,
//     })
//   );
// }

module.exports = {
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunchWithId,
};
