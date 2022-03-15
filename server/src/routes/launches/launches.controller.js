const {
  getAllLaunches,
  // addNewLaunch,
  abortLaunch,
  existsLaunchWithId,
  scheduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
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

  await scheduleNewLaunch(launch);
  res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({ error: "Launch Not Found" });
  }
  const aborted = await abortLaunch(launchId);
  if (aborted.modifiedCount < 1) {
    return res.status(400).json({ error: "Launch not aborted" });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
