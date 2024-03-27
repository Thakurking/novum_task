import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";
import * as config from "./config.json";

let base_path_array: string[] = []

config.path_config.forEach((val) => {
  base_path_array.push(path.format({
    dir: val.file_path
  }))
})

type file_path_object = {
  base_url: string;
  file_name: string
};

let file_path_array: file_path_object[] = [];

config.path_config.forEach((config) => {
  base_path_array.forEach((base_url) => {
    config.files.forEach((val) => {
      file_path_array.push({base_url: path.join(base_url, val), file_name: val})
    })
  })
})

// console.log('file path array list ==>', file_path_array)

// let fileName: string = "";
// const format_path = path.format({
//   dir: 'C:\\Users\\rites\\novum_task\\compose-file-examples',
// })
// console.log('format path ==>', format_path)
// const path_url = path.dirname('\Users\rites\novum_task\compose-file-examples')
// const pathVal = path.join(path_url, '..', 'compose-file-examples')
// fs.readdirSync(format_path).forEach((file) => {
//   console.log(file)
//   if (file.includes("docker-compose")) {
//     fileName = file;
//   }
// });
// console.log(fileName)
// export const filepath = path.join(format_path, fileName);
// console.log('file path ==>', filepath)

// unique machine id
// unique for each machine
export const machine_id = config.machine_id;

export async function composeReader(file_path: string, file_name: string): Promise<void> {
  try {
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
    let service_list: services_body_type[] = []
    let doc: any = yaml.load(fs.readFileSync(file_path, "utf-8"));
    // console.log('doc ==>', doc)
    // let compose_object: compose_body = {
    //   file_name: file_name,
    //   version: doc.version,
    //   images: Object.values(doc.services).map((val: any) => val.image),
    //   services: Object.keys(doc.services)
    // }
    const services = doc.services;
    // let services_compose_object: compose_body = {
    //   version: doc.version,
    //   file_name: file_name,
    // }
    for (const key in services) {
      service_list.push({
        service_name: key,
        image: services[key].image,
        container_name: services[key].container_name,
        volumes: services[key].volumes
      })
    }
    let compose_object: compose_body = {
      version: doc.version,
      file_name: file_name,
      services: service_list
    }
    console.log(compose_object)
    // Object.keys(doc.services).map((service_val) => {
    //   Object.values(doc.services).map((image_val: any) => {
    //     services_compose_object.push({
    //       service_name: service_val,
    //       file_name: file_name,
    //       version: doc.version,
    //       image: image_val.image,
    //       // container_name: 
    //     });
    //   })
    // })
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
  // filepath: string,
  hash_store: hash_key,
  // machine_id: string
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
    // const fileBuffer = fs.readFileSync(filepath);
    // const hashSum = crypto.createHash("sha256");
    // const hash = hashSum.update(fileBuffer);
    // const hex = hash.digest("hex");
    // console.log("HEX ==>", hex);
    // const hash_val = hash_store.find((arr) => arr.machine_id == machine_id);
    // console.log("hash value =", hash_val);
    // const objIndex = hash_store.findIndex(
    //   (obj) => obj.machine_id == machine_id
    // );
    // if (hash_val?.hash === hex) {
    //   return { status: true, hash: hex };
    // }
    // if (objIndex == -1) {
    //   hash_store.push({ machine_id: machine_id, hash: hex });
    // } else {
    //   hash_store[objIndex].hash = hex;
    // }
    // return { status: false, hash: hex };
  } catch (error) {
    console.log(error);
    // return { status: false, hash: "" };
  }
}
