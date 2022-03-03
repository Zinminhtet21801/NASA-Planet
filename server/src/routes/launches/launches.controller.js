const {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  console.log(launch);
  launch.launchDate = new Date(launch.launchDate);
  for (const item in launch) {
    if (item === "launchDate" && isNaN(launch.launchDate)) {
      return res.status(400).json({
        error: `${item} is required.`,
      });
    } else if (!launch[item]) {
      return res.status(400).json({
        error: `${item} is required.`,
      });
    }
  }

  addNewLaunch(launch);
  res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "Launch Not Found" });
  }
  return res.status(200).json(abortLaunch(launchId));
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
