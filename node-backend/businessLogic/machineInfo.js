const MachineModel = require('../../database/connection/machine.model');

module.exports.getMachineInfo = async () => {
    try {
        const machineData = await MachineModel.find({});
        return machineData
    } catch (error) {
        console.log(error);
        throw new Error({status: 500, message: 'Internal Server Error'});
    }
}

module.exports.saveMachineInfoData = async (data) => {
    try {
        const result = await MachineModel.findOneAndUpdate({machine_id: data.machine_id}, data, {
            new: true,
            upsert: true,
        });
        return { status: 200, message: 'Saved Machine Info' };
    } catch (error) {
        console.log(error)
        throw new Error({ status: 500, message: 'Internal Server Error' });
    }
}