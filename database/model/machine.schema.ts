import * as mongoose from "mongoose";

export const machineSchema = new mongoose.Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);
