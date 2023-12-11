const mongoose = require("mongoose");

const machineDB = mongoose.createConnection("mongodb://127.0.0.1:27017", {
  maxPoolSize: 10,
  auth: { username: "admin", password: "secret", authSource: "admin" },
});

module.exports = machineDB;
