require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_DB_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };