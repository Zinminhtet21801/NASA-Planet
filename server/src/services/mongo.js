require("dotenv").config();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

async function clearConnection() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongod.stop();
}

module.exports = { mongoConnect, mongoDisconnect,clearConnection };
