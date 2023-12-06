const machineDB = require('./machine.DB.connection');

const MachineModel = machineDB.model('machine_info', require('../model/machine.schema'));

module.exports = MachineModel;
