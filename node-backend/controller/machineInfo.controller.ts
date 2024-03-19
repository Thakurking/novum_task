import { Request, Response } from "express"
import {saveMachineInfoData, getMachineInfoData} from '../businessLogic/machineInfo';

// /**
//  * API to get the get machine info
//  * @param {object} req 
//  * @param {object} res 
//  */
// module.exports.getMachineInfo = async (_req: object, res: object): Promise<{}> => {
//     return businessLogic.getMachineInfo()
//         .then((result: any) => {
//             res.render('index', { data: result });
//         })
//         .catch((error: object) => {
//             console.log(error);
//             res.status(500).json({ message: 'Error Occured' });
//         });
// }

export class GetMachineInfo {
    constructor() {
        this.getMachineInfo = this.getMachineInfo.bind(this)
    }

    getMachineInfo(req: Request, res: Response) {
        return getMachineInfoData()
        .then((result: object) => {
            res.status(200).json(result);
        })
        .catch((error: object) => {
            res.status(500).json(error);
        })
    }
}

// /**
//  * API to upsert the machine info to database
//  * @param {object} req 
//  * @param {object} res 
//  */
// module.exports.saveMachineInfo = async (req: object, res: object): Promise<{}> => {
//     return businessLogic.saveMachineInfoData(req.body)
//         .then((result: any) => {
//             res.status(200).json(result);
//         })
//         .catch((error: object) => {
//             console.log(error);
//             res.status(500).json({ message: 'Error Occured' });
//         });
// }

// export class SaveMachineInfo {
//   constructor() {
//     this.saveMachineInfo = this.saveMachineInfo.bind(this);
//   }

// }

export async function saveMachineInfo(req: Request, res: Response) {
  try {
    const result = await saveMachineInfoData(
      req.body.machine_id,
      req.body.version,
      req.body.services
    )
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
    // .then((result) => {
    //   res.status(200).json(result);
    // })
    // .catch((error: object) => {
    //   res.status(500).json(error);
    // });
}