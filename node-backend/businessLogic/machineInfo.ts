// import MachineModel from '../database/model/machine.schema';
import MachineModel from "../database/connection/machine.model";

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
  free_disk_space: string;
  total_disk_space: string;
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
    );
    console.log('console compose find ==>',compose_file)
    if (compose_file === null) {
      const machine_model = new MachineModel({
        machine_id: machine_id,
        free_disk_space: compose_object.free_disk_space,
        total_disk_space: compose_object.total_disk_space,
      })
      machine_model.compose_list.push(obj);
      console.log('machine model compose list log ==>', machine_model.compose_list)
      const result = await machine_model.save();
      console.log('saved new file data',result)
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
              "compose_list.$.service_list": compose_object.services,
              free_disk_space: compose_object.free_disk_space,
              total_disk_space: compose_object.total_disk_space,
            }
          },
          {
            upsert: true,
          }
        );
        console.log('compose upsert ==>',compose_upsert)
      } else {
        const update_compose = await MachineModel.updateOne(
          {
            machine_id: machine_id,
          },
          {
            $push: {
              compose_list: obj
            },
            $set: {
              free_disk_space: compose_object.free_disk_space,
              total_disk_space: compose_object.total_disk_space,
            }
          },
        );
        console.log('pushed new field in existing compose ==>',update_compose)
      }
    }
    return { status: 200, message: "Saved Machine Info" };
  } catch (error) {
    console.log(error)
    return { status: 500, message: "Internal Server Error" };
  }
}
