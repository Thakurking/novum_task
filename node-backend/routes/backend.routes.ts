import { Router, Request, Response } from "express"
import { GetMachineInfo, saveMachineInfo } from "../controller/machineInfo.controller";

const backendRouter = Router()


backendRouter.get("/machine-info", new GetMachineInfo().getMachineInfo)

backendRouter.post('/save-machine-info', saveMachineInfo)

export = backendRouter
