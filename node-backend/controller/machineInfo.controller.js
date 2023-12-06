const businessLogic = require('../businessLogic/machineInfo');

module.exports.getMachineInfo = async (req, res) => {
    businessLogic.getMachineInfo()
    .then((result) => {
        console.log(result[0])
        res.render('index', { data: result })
    })
    .catch((error) => {
        console.log(error)
        return res.status(500).json({message: 'all not okay', status: 500})
    })
}

module.exports.saveMachineInfo = async (req, res) => {
    businessLogic.saveMachineInfoData(req.body)
    .then((result) => {
        console.log(result)
        return res.status(200).json(result)
    })
    .catch((error) => {
        console.log(error)
    })
}