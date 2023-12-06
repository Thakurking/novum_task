const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path')
const axios = require('axios');

const fileapth = path.join(__dirname, 'docker-compose.yaml')

const machine_id = 'docker-compose-machine-a';

const composeReader = async (file_path) => {
    try {
        const doc = yaml.load(fs.readFileSync(file_path, 'utf-8'))
        const version = doc.version;
        const services = Object.keys(doc.services)
        const body = {}
        body.version = version
        body.services = services
        body.machine_id = machine_id
        const result = await axios.post('http://localhost:5000/node-backend/save-machine-info', body);
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}

composeReader(fileapth)