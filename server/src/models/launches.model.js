const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: [
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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(id){
  return launches.has(id)
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function abortLaunch(id) {
  const aborted = launches.get(id)
  aborted.upcoming = false
  aborted.success = false
  return aborted
  // const index = Array.from(launches.values()).findIndex(
  //   (launchObj) => launchObj.flightNumber === id
  // );
  // const mapToArray = Array.from(launches.values());
  // mapToArray.splice(index, 1)
  // return mapToArray
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customers: ["ZEKE"],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  existsLaunchWithId
};
