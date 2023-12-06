const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path')
const axios = require('axios');

const fileapth = path.join(__dirname, 'docker-compose.yaml')

// unique machine id
// unique for each machine
const machine_id = 'docker-compose-machine-a';

/**
 * function to read docker compose file
 * @param {string} file_path 
 */
const composeReader = async (file_path) => {
    try {
        const doc = yaml.load(fs.readFileSync(file_path, 'utf-8')) // package to read the docker-compose file
        const version = doc.version;
        const services = Object.keys(doc.services)
        const body = {}
        body.version = version
        body.services = services
        body.machine_id = machine_id
        // API request to the node-backend server to save the machine info.
        const result = await axios.post('http://localhost:5000/node-backend/save-machine-info', body);
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}

composeReader(fileapth)