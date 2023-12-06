const mongoose = require('mongoose');

const machineDB = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/machinedb',
    { maxPoolSize: 10 }
)

module.exports = machineDB;
