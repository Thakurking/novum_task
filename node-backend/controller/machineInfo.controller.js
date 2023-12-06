const businessLogic = require('../businessLogic/machineInfo');

/**
 * API to get the get machine info
 * @param {object} req 
 * @param {object} res 
 */
module.exports.getMachineInfo = async (req, res) => {
    businessLogic.getMachineInfo()
    .then((result) => {
        res.render('index', { data: result })
    })
    .catch((error) => {
        console.log(error)
        return res.status(500).json({message: 'Error Occured'})
    })
}

/**
 * API to upsert the machine info to database
 * @param {object} req 
 * @param {object} res 
 */
module.exports.saveMachineInfo = async (req, res) => {
    businessLogic.saveMachineInfoData(req.body)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Error Occured' });
    })
}