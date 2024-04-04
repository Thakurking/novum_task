import dotenv from "dotenv";
import { composeCompare, machine_id } from "./scanner";

dotenv.config();

type hash_type = {
  file_name: string;
  hash: string
}

type hash_key = {
  machine_id: string;
  file: hash_type[];
};

let hash_store: hash_key = {
  machine_id: machine_id,
  file: []
};

type composeCompareType = (
  // filepath: string,
  hash_store: hash_key,
  // machine_id: string
) => void;

type composeReaderType = (filepath: string) => void;

console.log("Entered Scanner")

const intervalId = setInterval(
  composeReaderCallBack,
  10000,
  // filepath,
  composeCompare,
  machine_id,
  // composeReader
);

async function composeReaderCallBack(
  // filepath: string,
  composeCompare: composeCompareType,
  machine_id: string,
  // composeReader: composeReaderType
): Promise<void> {
  try {
    console.log("Entered Callback");
    const result = await composeCompare(hash_store);
    // if (!result.status) {
    //   await composeReader(filepath);
    // }
    // console.log("Hash Store =", hash_store);
  } catch (error) {
    console.log(error);
  }
}
