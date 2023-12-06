const mongoose = require('mongoose');

const { Schema } = mongoose

const machineSchema = new Schema({
    machine_id: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    services: {
        type: Array,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = machineSchema;
