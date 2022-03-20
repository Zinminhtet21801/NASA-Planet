require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected!");
// });

// mongoose.connection.on("close", () => {
//   console.log("MongoDB closed!");
//   // process.kill(process.pid, "SIGINT");
// });

// mongoose.connection.on("error", (err) => {
//   console.error(err);
// });

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
