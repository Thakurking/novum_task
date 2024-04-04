import mongoose from "mongoose";

const machineDB = mongoose.createConnection("mongodb://mongo_db:27017/", {
  maxPoolSize: 10,
  auth: { username: "admin", password: "secret" },
});

export default machineDB
