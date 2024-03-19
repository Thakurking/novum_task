import mongoose from "mongoose";

const machineDB = mongoose.createConnection("mongodb://127.0.0.1:27017/compass", {
  maxPoolSize: 10,
  // auth: { username: "admin", password: "secret" },
});

export default machineDB
