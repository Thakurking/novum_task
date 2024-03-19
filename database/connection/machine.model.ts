import machineDB from "./machine.DB.connection";
import { machineSchema } from "../model/machine.schema";

const MachineModel = machineDB.model(
  "machine_info",
  machineSchema
);

export default MachineModel;
