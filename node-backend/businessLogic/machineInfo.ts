import MachineModel from '../../database/connection/machine.model';

// /**
//  * Business Logic to get machine info
//  * @returns {object}
//  */
// module.exports.getMachineInfo = async () => {
//     try {
//         const machineData = await MachineModel.find({});
//         return machineData
//     } catch (error) {
//         console.log(error);
//         throw new Error({status: 500, message: 'Internal Server Error'});
//     }
// }

/**
 * 
 * @returns object
 */
export async function getMachineInfoData(): Promise<{
  status: number;
  data: any[];
}> {
  try {
    const machineInfo = await MachineModel.find({});
    return { status: 200, data: machineInfo };
  } catch (error) {
    return { status: 500, data: [] };
  }
}

// /**
//  * Business Logic to save the machine info to database
//  * @param {object} data 
//  * @returns {object}
//  */
// module.exports.saveMachineInfoData = async (data) => {
//     try {
//         const result = await MachineModel.findOneAndUpdate({machine_id: data.machine_id}, data, {
//             new: true,
//             upsert: true,
//         });
//         return { status: 200, message: 'Saved Machine Info' };
//     } catch (error) {
//         console.log(error)
//         throw new Error({ status: 500, message: 'Internal Server Error' });
//     }
// }

/**
 * 
 * @param machine_id string
 * @param version string
 * @param services array
 * @returns object
 */
export async function saveMachineInfoData(
  machine_id: string,
  version: string,
  services: any[]
): Promise<{ status: number; message: string }> {
  try {
    await MachineModel.findOneAndUpdate(
      { machine_id: machine_id },
      { machine_id, version, services },
      {
        new: true,
        upsert: true,
      }
    );
    return { status: 200, message: "Saved Machine Info" };
  } catch (error) {
    console.log(error)
    return { status: 500, message: "Internal Server Error" };
  }
}
