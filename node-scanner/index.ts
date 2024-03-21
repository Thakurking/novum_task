import dotenv from "dotenv";
import { filepath, composeReader, composeCompare, machine_id } from "./scanner";

dotenv.config();

let hash_store: any[] = []

const intervalId = setInterval(
  composeReaderCallBack,
  10000,
  filepath,
  composeCompare,
  machine_id,
  composeReader
);

async function composeReaderCallBack(
  filepath: string,
  composeCompare: any,
  machine_id: string,
  composeReader: any
): Promise<void> {
  try {
    const result = await composeCompare(filepath, hash_store, machine_id);
    if (!result.status) {
      await composeReader(filepath);
    }
    console.log('Hash Store =', hash_store)
  } catch (error) {
    console.log(error)
  }
}
