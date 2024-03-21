import { Router, Request, Response } from "express"
import { getMachineInfo, saveMachineInfo } from "../controller/machineInfo.controller";

const backendRouter = Router()


backendRouter.get("/machine-info", getMachineInfo)

backendRouter.post('/save-machine-info', saveMachineInfo)

export = backendRouter
