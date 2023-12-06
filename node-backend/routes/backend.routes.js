const express = require("express")

const backendRouter = express.Router()

const backendController = require("../controller/machineInfo.controller")

backendRouter.get("/machine-info", backendController.getMachineInfo)

backendRouter.post('/save-machine-info', backendController.saveMachineInfo)

module.exports = backendRouter
