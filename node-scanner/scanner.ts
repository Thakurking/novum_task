import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import axios from "axios";

let fileName: string = "";
fs.readdirSync(__dirname).forEach((file) => {
  if (file.includes("docker-compose")) {
    fileName = file;
  }
});

export const fileapath = path.join(__dirname, fileName);

// unique machine id
// unique for each machine
const machine_id = "docker-compose-machine-a";

/**
 * function to read docker compose file
 * @param {string} file_path
 */
// const composeReader = async (file_path: string) => {
//     try {
//         const doc = yaml.load(fs.readFileSync(file_path, 'utf-8')) // package to read the docker-compose file
//         const version = doc.version;
//         const services = Object.keys(doc.services)
//         const body = {}
//         body.version = version
//         body.services = services
//         body.machine_id = machine_id
//         // API request to the node-backend server to save the machine info.
//         const result = await axios.post('http://localhost:5000/node-backend/save-machine-info', body);
//         console.log(result.data)
//     } catch (error) {
//         console.log(error)
//     }
// }

// composeReader(fileapth)

export async function composeReader(file_path: string): Promise<void> {
  try {
    const doc: any = yaml.load(fs.readFileSync(file_path, "utf-8"));
    console.log(doc)
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
    const result = await axios.post(
      `${process.env.MACHINE_API_URL}`,
      reqBody
    );
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// composeReader(fileapath);
