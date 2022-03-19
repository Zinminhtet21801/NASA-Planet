require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (e) {
    console.log(e);
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { mongoConnect, mongoDisconnect };
