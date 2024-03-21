import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";
import * as docker_machine_id from "./config.json";

let fileName: string = "";
fs.readdirSync(__dirname).forEach((file) => {
  if (file.includes("docker-compose")) {
    fileName = file;
  }
});

export const filepath = path.join(__dirname, fileName);

// unique machine id
// unique for each machine
export const machine_id = docker_machine_id.machine_id;

export async function composeReader(file_path: string): Promise<void> {
  try {
    const doc: any = yaml.load(fs.readFileSync(file_path, "utf-8"));
    const version = doc.version;
    const services = Object.keys(doc.services);
    type body = {
      version: string;
      services: any[];
      machine_id: string;
    };
    const reqBody: body = {
      version: version,
      services: services,
      machine_id: machine_id,
    };
    const result = await axios.post(`${process.env.MACHINE_API_URL}`, reqBody);
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

export async function composeCompare(
  filepath: string,
  hash_store: any[],
  machine_id: string
): Promise<{ status: boolean; hash: string }> {
  try {
    const fileBuffer = fs.readFileSync(filepath);
    const hashSum = crypto.createHash("sha256");
    const hash = hashSum.update(fileBuffer);
    const hex = hash.digest("hex");
    const hash_val = hash_store.find((arr) => arr.machine_id == machine_id);
    console.log("hash value =", hash_val);
    const objIndex = hash_store.findIndex(
      (obj) => obj.machine_id == machine_id
    );
    if (hash_val?.hash == hex) {
      return { status: true, hash: hex };
    }
    if (objIndex == -1) {
      hash_store.push({ machine_id: machine_id, hash: hex });
    } else {
      hash_store[objIndex].hash = hex;
    }
    return { status: false, hash: hex };
  } catch (error) {
    console.log(error);
    return { status: false, hash: "" };
  }
}
