import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";
import * as config from "./config.json";
import checkDiskSpace from 'check-disk-space'

type file_path_object = {
  base_url: string;
  file_name: string
};

let file_path_array: Array<file_path_object> = [];

config.path_config.forEach((val) => {
  file_path_array.push({base_url: val, file_name: path.basename(val)})
})

// unique machine id
// unique for each machine
export const machine_id = config.machine_id;

export async function readHardwareInfo() {
  const diskSpace = ((await checkDiskSpace('/')).free / 1024 / 1024 / 1024).toFixed(2)
  const total_space = ((await checkDiskSpace('/')).size / 1024 / 1024 / 1024).toFixed(2)
  return {
    diskSpace,
    total_space
  }
}

type services_body_type = {
  service_name: string;
  image: string;
  container_name: string;
  volumes: Array<string>;
  image_version: string
}
type compose_body = {
  version: string;
  file_name: string;
  services: Array<services_body_type>;
  free_disk_space: string;
  total_disk_space: string;
};

export async function composeReader(file_path: string, file_name: string): Promise<void> {
  try {
    let service_list: services_body_type[] = []
    let doc: any = yaml.load(fs.readFileSync(file_path, "utf-8"));
    const services = doc.services;
    for (const key in services) {
      service_list.push({
        service_name: key,
        container_name: services[key].container_name,
        image: services[key].image,
        volumes: services[key].volumes,
        image_version: services[key].image.split(":")[1]
      })
    }
    const diskInfo = await readHardwareInfo();
    console.log('Current Disk Space ==>', diskInfo.diskSpace)
    console.log('Current Disk total Size ==>', diskInfo.total_space)
    let compose_object: compose_body = {
      version: doc.version,
      file_name: file_name,
      services: service_list,
      free_disk_space: diskInfo.diskSpace,
      total_disk_space: diskInfo.total_space,
    }
    console.log(compose_object)
    const result = await axios.post(`${process.env.MACHINE_API_URL}`, {
      machine_id,
      compose_object,
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

type hash_type = {
  file_name: string;
  hash: string
}

type hash_key = {
  machine_id: string;
  file: hash_type[];
};

export async function composeCompare(
  hash_store: hash_key,
): Promise<void> {
  try {
    file_path_array.forEach(async (val) => {
      let fileBuffer = fs.readFileSync(val.base_url)
      const hex = crypto
        .createHmac("sha256", config.machine_id)
        .update(fileBuffer)
        .digest("hex");
      const objIndex = hash_store.file.findIndex(
        (obj) => obj.file_name === val.file_name
      );
      if (hash_store.file[objIndex]?.hash !== hex) {
        await composeReader(val.base_url, val.file_name);
      }
      if (objIndex === -1) {
        hash_store.file.push({ file_name: val.file_name, hash: hex });
      } else {
        hash_store.file[objIndex].hash = hex;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
