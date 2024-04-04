// import MachineModel from '../database/model/machine.schema';
import MachineModel from "../database/connection/machine.model";

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

// type compose_body = {
//   version: string;
//   services: string[];
//   images: string[];
//   file_name: string;
// };

type services_body_type = {
  service_name: string;
  image: string;
  container_name: string;
  volumes: string[];
}
type compose_body = {
  version: string;
  file_name: string;
  services: services_body_type[];
};

/**
 * 
 * @param machine_id string
 * @param version string
 * @param services array
 * @returns object
 */
export async function saveMachineInfoData(
  machine_id: string,
  compose_object: compose_body
): Promise<{ status: number; message: string }> {
  console.log('compose object in api ==>', compose_object)
  try {
    let obj = {
      compose_file_name: compose_object.file_name,
      compose_version: compose_object.version,
      service_list: compose_object.services
    }
    const compose_file = await MachineModel.findOne(
      {
        machine_id: machine_id,
      },
      // {
      //   compose_details: {
      //     $elemMatch: {
      //       file_name: compose_object.file_name,
      //     },
      //   },
      // }
    );
    console.log('console compose find ==>',compose_file)
    if (compose_file === null) {
      const machine_model = new MachineModel({
        machine_id: machine_id,
        // compose_list: obj
      })
      machine_model.compose_list.push(obj);
      console.log('machine model compose list log ==>', machine_model.compose_list)
      const result = await machine_model.save();
      console.log('saved new file data',result)
      // const updateCompose = await MachineModel.updateOne(
      //   {
      //     machine_id: machine_id,
      //     "compose_details.file_name": compose_object.file_name,
      //   },
      //   {
      //     $set: {
            // "compose_details.$.services": compose_object.services,
            // "compose_details.$.images": compose_object.images,
            // "compose_details.$.version": compose_object.version,
            // "compose_details.$.file_name": compose_object.file_name,
      //     },
      //   }
      // );
      // console.log(updateCompose)
    } else {
      const compose_file_elem = await MachineModel.findOne(
        {
          machine_id: machine_id
        },
        {
          compose_list: {
            $elemMatch: {
              compose_file_name: compose_object.file_name,
            },
          },
        }
      )
      console.log('found compose with file match', compose_file_elem)
      if (compose_file_elem?.compose_list.length) {
        const compose_upsert = await MachineModel.updateOne(
          { machine_id: machine_id, "compose_list.compose_file_name": compose_object.file_name },
          {
            $set: {
              "compose_list.$.compose_version": compose_object.version,
              "compose_list.$.service_list": compose_object.services
              // "compose_details.$.services": compose_object.services,
              // "compose_details.$.images": compose_object.images,
              // "compose_details.$.version": compose_object.version,
              // "compose_details.$.file_name": compose_object.file_name,
            }
          },
          {
            // new: true,
            upsert: true,
          }
        );
        console.log('compose upsert ==>',compose_upsert)
      } else {
        const update_compose = await MachineModel.updateOne(
          {
            machine_id: machine_id,
            // "compose_details.file_name": compose_object.file_name,
          },
          {
            $push: {
              compose_list: obj
            },
          },
        );
        console.log('pushed new field in existing compose ==>',update_compose)
      }
      // const update_compose = await MachineModel.updateOne(
      //   {
      //     machine_id: machine_id,
      //     "compose_details.file_name": compose_object.file_name,
      //   },
      //   {
      //     $push: {
      //       "compose_details": compose_object
      //     },
      //   }
      // );
      // console.log(update_compose)
    }
    // await MachineModel.findOneAndUpdate(
    //   { machine_id: machine_id },
    //   {
    //     $set: {
    //       compose_details: compose_object
    //     }
    //   },
    //   {
    //     new: true,
    //     upsert: true,
    //   }
    // );
    return { status: 200, message: "Saved Machine Info" };
  } catch (error) {
    console.log(error)
    return { status: 500, message: "Internal Server Error" };
  }
}
